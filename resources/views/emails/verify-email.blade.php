<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Viflex</title>
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }

        .logo {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.025em;
        }

        .tagline {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 16px;
        }

        .message {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 32px;
            line-height: 1.7;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 24px 0;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
        }

        .cta-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 15px -3px rgba(59, 130, 246, 0.4);
        }

        .info-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
        }

        .info-title {
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            font-size: 14px;
        }

        .info-text {
            color: #6b7280;
            font-size: 14px;
            line-height: 1.5;
        }

        .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }

        .footer-text {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 16px;
        }

        .footer-links {
            margin-top: 16px;
        }

        .footer-link {
            color: #3b82f6;
            text-decoration: none;
            font-size: 14px;
            margin: 0 12px;
        }

        .footer-link:hover {
            text-decoration: underline;
        }

        .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 24px 0;
        }

        .security-note {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 16px;
            margin: 24px 0;
        }

        .security-title {
            font-weight: 600;
            color: #92400e;
            margin-bottom: 8px;
            font-size: 14px;
        }

        .security-text {
            color: #92400e;
            font-size: 14px;
            line-height: 1.5;
        }

        /* Responsive design */
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }

            .header,
            .content,
            .footer {
                padding: 30px 20px;
            }

            .greeting {
                font-size: 20px;
            }

            .cta-button {
                display: block;
                text-align: center;
                padding: 14px 24px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">Viflex</div>
            <div class="tagline">Sports Management Platform</div>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="greeting">Hello {{ $name }}!</div>

            <div class="message">
                Thank you for joining Viflex! We're excited to have you on board. To get started with managing your
                sports teams, competitions, and events, please verify your email address by clicking the button below.
            </div>

            <!-- Call to Action Button -->
            <div style="text-align: center;">
                <a href="{{ $url }}" class="cta-button" style="color: white;">
                    Verify Email Address
                </a>
            </div>

            <!-- Security Note -->
            <div class="security-note">
                <div class="security-title">🔒 Security Notice</div>
                <div class="security-text">
                    This verification link will expire in 60 minutes. If you didn't create an account with Viflex, you
                    can safely ignore this email.
                </div>
            </div>

            <!-- Alternative Link -->
            <div class="info-box">
                <div class="info-title">Having trouble with the button?</div>
                <div class="info-text">
                    If the button above doesn't work, copy and paste this link into your browser:
                </div>
                <div style="margin-top: 12px; word-break: break-all;">
                    <a href="{{ $url }}"
                        style="color: #3b82f6; text-decoration: none; font-size: 14px;">{{ $url }}</a>
                </div>
            </div>

            <div class="divider"></div>

            <div class="message">
                Once verified, you'll have access to all Viflex features including:
            </div>

            <ul style="color: #6b7280; font-size: 16px; line-height: 1.7; margin-left: 20px;">
                <li>Create and manage sports clubs and teams</li>
                <li>Organize competitions and tournaments</li>
                <li>Schedule games and events</li>
                <li>Track player statistics and performance</li>
                <li>Manage venues and locations</li>
            </ul>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                This email was sent to you because you signed up for a Viflex account.
            </div>

            <div class="footer-links">
                <a href="{{ config('app.url') }}" class="footer-link">Visit Viflex</a>
                <a href="{{ config('app.url') }}/support" class="footer-link">Support</a>
                <a href="{{ config('app.url') }}/privacy" class="footer-link">Privacy Policy</a>
            </div>

            <div style="margin-top: 20px; color: #9ca3af; font-size: 12px;">
                © {{ date('Y') }} Viflex. All rights reserved.
            </div>
        </div>
    </div>
</body>

</html>
