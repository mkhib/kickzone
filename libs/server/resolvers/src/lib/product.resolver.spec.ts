import { ProductResolver } from './product.resolver';
import * as fs from 'fs';
import * as path from 'path';
import { FileUpload } from './product.resolver';
import { Readable } from 'stream';

jest.mock('fs');
jest.mock('@kickzone-workspace/services');

interface MockWriteStream {
  on: jest.Mock;
  once: jest.Mock;
  removeListener: jest.Mock;
  emit: jest.Mock;
  end: jest.Mock;
  write: jest.Mock;
}

interface MockSellerService {
  [key: string]: unknown;
}

describe('ProductResolver', () => {
  let resolver: ProductResolver;
  let mockProductService: {
    addImagesToProductInfo: jest.Mock;
    removeImageFromProductInfo: jest.Mock;
  };
  let mockSellerService: MockSellerService;

  const uploadDir = path.resolve(process.cwd(), 'uploads', 'products');

  beforeEach(() => {
    jest.clearAllMocks();
    mockProductService = {
      addImagesToProductInfo: jest.fn().mockResolvedValue(undefined),
      removeImageFromProductInfo: jest.fn().mockResolvedValue(undefined),
    };
    mockSellerService = {};
    resolver = new ProductResolver(
      mockProductService as never,
      mockSellerService as never
    );

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.mkdirSync as jest.Mock).mockImplementation(jest.fn());
    (fs.unlinkSync as jest.Mock).mockImplementation(jest.fn());
    (fs.createWriteStream as jest.Mock).mockImplementation((): MockWriteStream => {
      const mockWriteStream: MockWriteStream = {
        on: jest.fn((_event: string, cb: () => void) => {
          if (_event === 'finish') {
            setImmediate(cb);
          }
          return mockWriteStream;
        }),
        once: jest.fn((_event: string, cb: () => void) => {
          if (_event === 'finish') {
            setImmediate(cb);
          }
          return mockWriteStream;
        }),
        removeListener: jest.fn((_arg: unknown) => {
          return mockWriteStream;
        }),
        emit: jest.fn((_arg: unknown) => {
          return true;
        }),
        end: jest.fn(),
        write: jest.fn(),
      };
      return mockWriteStream;
    });
  });

  describe('uploadProductInfoImages', () => {
    const createMockFile = (filename: string): Promise<FileUpload> => {
      const readable = new Readable({
        read() {
          this.push(null);
        },
      });
      return Promise.resolve({
        filename,
        mimetype: 'image/jpeg',
        encoding: '7bit',
        createReadStream: () => readable,
      });
    };

    it('sanitizes traversal filename like "../../evil.js" to safe basename and writes inside uploadDir', async () => {
      const files = [createMockFile('../../evil.js')];
      const result = await resolver.uploadProductInfoImages(1, files);

      expect(result).toHaveLength(1);
      const savedPath = (fs.createWriteStream as jest.Mock).mock.calls[0][0];
      expect(savedPath).toContain('uploads' + path.sep + 'products' + path.sep);
      expect(savedPath).not.toContain('..');
      expect(result[0]).toMatch(/\/uploads\/products\/\d+-evil\.js$/);
      expect(result[0].split('/uploads/products/')[1]).not.toContain('/');
    });

    it('sanitizes traversal filename with backslashes like "..\\..\\x" to safe basename and writes inside uploadDir', async () => {
      const files = [createMockFile('..\\..\\x')];
      const result = await resolver.uploadProductInfoImages(1, files);

      expect(result).toHaveLength(1);
      const savedPath = (fs.createWriteStream as jest.Mock).mock.calls[0][0];
      expect(savedPath).toContain('uploads' + path.sep + 'products' + path.sep);
      expect(savedPath).not.toContain('..');
      expect(result[0]).toMatch(/\/uploads\/products\/\d+-x$/);
      expect(result[0].split('/uploads/products/')[1]).not.toContain('/');
    });

    it('sanitizes special characters in filename', async () => {
      const files = [createMockFile('my file@#$.jpg')];
      const result = await resolver.uploadProductInfoImages(1, files);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatch(/\/uploads\/products\/\d+-my_file___\.jpg$/);
    });

    it('falls back to "file" for empty or only-dots filename', async () => {
      const files = [createMockFile('...')];
      const result = await resolver.uploadProductInfoImages(1, files);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatch(/\/uploads\/products\/\d+-file$/);
    });

    it('returns URL with no path traversal after /uploads/products/', async () => {
      const files = [createMockFile('normal.jpg')];
      const result = await resolver.uploadProductInfoImages(1, files);

      expect(result).toHaveLength(1);
      const urlPart = result[0].split('/uploads/products/')[1];
      expect(urlPart).not.toContain('/');
      expect(urlPart).not.toContain('..');
    });
  });

  describe('removeProductInfoImage', () => {
    it('rejects traversal imageName like "../../etc/passwd" and does not call unlinkSync or removeImageFromProductInfo', async () => {
      const result = await resolver.removeProductInfoImage(1, '../../etc/passwd');

      expect(result).toBe(false);
      expect(fs.unlinkSync).not.toHaveBeenCalled();
      expect(mockProductService.removeImageFromProductInfo).not.toHaveBeenCalled();
    });

    it('rejects traversal imageName with backslashes like "..\\..\\x" and does not call unlinkSync or removeImageFromProductInfo', async () => {
      const result = await resolver.removeProductInfoImage(1, '..\\..\\x');

      expect(result).toBe(false);
      expect(fs.unlinkSync).not.toHaveBeenCalled();
      expect(mockProductService.removeImageFromProductInfo).not.toHaveBeenCalled();
    });

    it('rejects empty imageName', async () => {
      const result = await resolver.removeProductInfoImage(1, '');

      expect(result).toBe(false);
      expect(fs.unlinkSync).not.toHaveBeenCalled();
      expect(mockProductService.removeImageFromProductInfo).not.toHaveBeenCalled();
    });

    it('rejects "." as imageName', async () => {
      const result = await resolver.removeProductInfoImage(1, '.');

      expect(result).toBe(false);
      expect(fs.unlinkSync).not.toHaveBeenCalled();
      expect(mockProductService.removeImageFromProductInfo).not.toHaveBeenCalled();
    });

    it('rejects ".." as imageName', async () => {
      const result = await resolver.removeProductInfoImage(1, '..');

      expect(result).toBe(false);
      expect(fs.unlinkSync).not.toHaveBeenCalled();
      expect(mockProductService.removeImageFromProductInfo).not.toHaveBeenCalled();
    });

    it('rejects imageName that differs from basename (contains path separators)', async () => {
      const result = await resolver.removeProductInfoImage(1, 'subdir/file.jpg');

      expect(result).toBe(false);
      expect(fs.unlinkSync).not.toHaveBeenCalled();
      expect(mockProductService.removeImageFromProductInfo).not.toHaveBeenCalled();
    });

    it('unlinks file inside uploads/products and calls removeImageFromProductInfo with correct URL for normal name', async () => {
      const result = await resolver.removeProductInfoImage(1, 'a.jpg');

      expect(result).toBe(true);
      expect(fs.unlinkSync).toHaveBeenCalledWith(
        path.resolve(uploadDir, 'a.jpg')
      );
      expect(mockProductService.removeImageFromProductInfo).toHaveBeenCalledWith(
        1,
        '/uploads/products/a.jpg'
      );
    });

    it('returns false and does not call service if fs.unlinkSync throws', async () => {
      (fs.unlinkSync as jest.Mock).mockImplementationOnce(() => {
        throw new Error('EACCES');
      });

      const result = await resolver.removeProductInfoImage(1, 'a.jpg');

      expect(result).toBe(false);
      expect(mockProductService.removeImageFromProductInfo).not.toHaveBeenCalled();
    });

    it('returns false and does not call service if removeImageFromProductInfo throws', async () => {
      mockProductService.removeImageFromProductInfo.mockRejectedValueOnce(
        new Error('DB error')
      );

      const result = await resolver.removeProductInfoImage(1, 'a.jpg');

      expect(result).toBe(false);
      expect(fs.unlinkSync).toHaveBeenCalledWith(
        path.resolve(uploadDir, 'a.jpg')
      );
    });
  });
});