import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private gmail;

  constructor(private configService: ConfigService) {
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get('GMAIL_OAUTH_CLIENT_ID'),
      this.configService.get('GMAIL_OAUTH_CLIENT_SECRET')
    );

    oauth2Client.setCredentials({
      refresh_token: this.configService.get('GMAIL_OAUTH_REFRESH_TOKEN'),
    });

    this.gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  }

  async sendEmail(to: string, subject: string, html: string) {
    const from = this.configService.get('GMAIL_CUSTOM_FROM_ADDRESS');

    const message = [
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      '',
      html,
    ].join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    try {
      await this.gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });
    } catch (error: any) {
      console.error('Error sending email:', error);
      
      // Check for OAuth errors
      if (error?.response?.data?.error === 'invalid_grant') {
        throw new Error(
          'Gmail OAuth refresh token is invalid or expired. Please regenerate the refresh token. See EMAIL_OAUTH_SETUP.md for instructions.'
        );
      }
      
      // Check for other OAuth errors
      if (error?.code === 401 || error?.status === 401) {
        throw new Error(
          'Gmail OAuth authentication failed. Please check your OAuth credentials and refresh token.'
        );
      }
      
      throw new Error(`Failed to send email: ${error?.message || 'Unknown error'}`);
    }
  }
}
