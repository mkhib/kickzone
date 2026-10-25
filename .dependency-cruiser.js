module.exports = {
  $schema: 'https://raw.githubusercontent.com/sverweij/dependency-cruiser/master/src/schema/dependencycruiser.schema.json',
  extends: 'dependency-cruiser/config/recommended.json',
  includeOnly: ['^libs/', '^apps/'],
  exclude: {
    forArchitectureValidation: [],
    forCruise: [
      '(^|\\/)node_modules(\\/|$)',
      '(^|\\/)dist(\\/|$)',
      '(^|\\/)tmp(\\/|$)',
      '(^|\\/)coverage(\\/|$)',
      '\\.spec\\.ts$',
      '\\.spec\\.tsx$',
      '\\.test\\.ts$',
      '\\.test\\.tsx$',
      'jest\\.config',
      'vite\\.config',
      'webpack\\.config',
      'nest-webpack\\.config',
      'tsconfig.*\\.json',
      'eslint\\.config'
    ]
  },
  dependencyTypes: {
    module: {
      resolution: {
        isAllowed: (source, resolved) => {
          return resolved && resolved.startsWith(process.cwd());
        }
      },
      options: {
        flatten: true
      }
    }
  },
  ruleSets: {
    architected: {
      name: 'Kickzone architecture rules',
      rules: [
        {
          name: 'no-server-imports-in-client',
          comment: 'Client SPAs must not import server-side code directly',
          severity: 'error',
          fix: 'auto',
          restrict: {
            inPath: '^apps/client/(admins|customers|sellers)/',
            toPath: '^libs/server/'
          }
        },
        {
          name: 'entities-only-import-utils',
          comment: 'Server entities layer may only import utils (no circular deps)',
          severity: 'error',
          restrict: {
            inPath: '^libs/server/entities/',
            toPath: '^(?!libs/server/utils)'
          },
          allow: []
        },
        {
          name: 'no-cross-client-imports-admins',
          comment: 'Admins libs must not import from customers or sellers',
          severity: 'warn',
          restrict: {
            inPath: '^libs/client/admins/',
            toPath: '^libs/client/(customers|sellers)/'
          }
        },
        {
          name: 'no-cross-client-imports-customers',
          comment: 'Customers libs must not import from admins or sellers',
          severity: 'warn',
          restrict: {
            inPath: '^libs/client/customers/',
            toPath: '^libs/client/(admins|sellers)/'
          }
        },
        {
          name: 'no-cross-client-imports-sellers',
          comment: 'Sellers libs must not import from admins or customers',
          severity: 'warn',
          restrict: {
            inPath: '^libs/client/sellers/',
            toPath: '^libs/client/(admins|customers)/'
          }
        },
        {
          name: 'all-resolve-through-shared-graphql',
          comment: 'Clients should use generated graphql types from shared/graphql',
          severity: 'info',
          restrict: {
            inPath: '^apps/client/',
            toPath: '^libs/client/shared/graphql/'
          }
        }
      ]
    }
  },
  output: {
    mermaid: {
      file: '.ai-context/dependency-graph.md',
      title: '# Kickzone Module Dependency Graph',
      excludes: {
        forCruise: [],
        forArchitectureValidation: []
      }
    }
  }
};
