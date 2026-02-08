# Keycloak Theme Implementation Guide

This guide explains how to implement the All About Money design system in Keycloak.

## Files Provided

1. **KEYCLOAK_DESIGN_SYSTEM.md** - Complete design system documentation with all colors, typography, and component specs
2. **keycloak-theme.css** - Ready-to-use CSS file with all styles
3. **keycloak-login-example.html** - Example HTML showing how to use the styles
4. **KEYCLOAK_IMPLEMENTATION_GUIDE.md** - This file

## Quick Start

### Step 1: Create Keycloak Theme Directory

```bash
cd /path/to/keycloak/themes
mkdir all-about-money
cd all-about-money
```

### Step 2: Create Theme Structure

```bash
mkdir -p login/resources/css
mkdir -p login/resources/img
mkdir -p account/resources/css
mkdir -p email/html
```

Your theme directory should look like:
```
all-about-money/
├── login/
│   ├── resources/
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── img/
│   │       └── logo.png
│   ├── login.ftl
│   ├── register.ftl
│   ├── info.ftl
│   └── error.ftl
├── account/
│   └── resources/
│       └── css/
│           └── styles.css
├── email/
│   └── html/
│       ├── email-verification.ftl
│       └── password-reset.ftl
└── theme.properties
```

### Step 3: Copy CSS File

Copy `keycloak-theme.css` to `login/resources/css/styles.css`:

```bash
cp keycloak-theme.css login/resources/css/styles.css
```

### Step 4: Create theme.properties

Create `theme.properties` in the root of your theme:

```properties
parent=keycloak
import=common/keycloak

styles=css/styles.css
```

### Step 5: Customize Login Template

Create `login/login.ftl` (example template):

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico">
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
</head>
<body>
    <div id="kc-container">
        <div id="kc-container-wrapper">
            <#-- Header -->
            <div id="kc-header">
                <div id="kc-header-wrapper">
                    <h1 class="display-large">${msg("loginTitleHtml",(realm.displayNameHtml!''))}</h1>
                </div>
            </div>

            <#-- Login Form -->
            <div id="kc-form">
                <#if message?has_content>
                    <div class="alert alert-${message.type}">
                        ${kcSanitize(message.summary)?no_esc}
                    </div>
                </#if>

                <form id="kc-form-wrapper" action="${url.loginAction}" method="post">
                    <#-- Username -->
                    <div class="form-group">
                        <label for="username" class="form-label">
                            <#if !realm.loginWithEmailAllowed>
                                ${msg("username")}
                            <#elseif !realm.registrationEmailAsUsername>
                                ${msg("usernameOrEmail")}
                            <#else>
                                ${msg("email")}
                            </#if>
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value="${(login.username!'')}"
                            placeholder="${msg('usernameOrEmail')}"
                            required
                            autofocus
                        />
                    </div>

                    <#-- Password -->
                    <div class="form-group">
                        <label for="password" class="form-label">${msg("password")}</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="${msg('password')}"
                            required
                        />
                    </div>

                    <#-- Remember Me -->
                    <#if realm.rememberMe && !usernameEditDisabled??>
                        <div class="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    <#if login.rememberMe??>checked</#if>
                                />
                                <span class="body-large">${msg("rememberMe")}</span>
                            </label>
                        </div>
                    </#if>

                    <#-- Submit -->
                    <div id="kc-form-buttons">
                        <input type="hidden" name="credentialId" value="${auth.selectedCredential!''}" />
                        <button type="submit" class="btn-primary">${msg("doLogIn")}</button>
                    </div>

                    <#-- Reset Password -->
                    <#if realm.resetPasswordAllowed>
                        <div class="text-center mt-md">
                            <a href="${url.loginResetCredentialsUrl}" class="btn-link">
                                ${msg("doForgotPassword")}
                            </a>
                        </div>
                    </#if>
                </form>
            </div>

            <#-- Social Login -->
            <#if realm.password && social.providers??>
                <div id="kc-social-providers">
                    <p class="body-large text-muted text-center mb-md">${msg("identity-provider-login-label")}</p>
                    <ul>
                        <#list social.providers as p>
                            <li <#if social.providers?size gt 1>class="mt-sm"</#if>>
                                <a href="${p.loginUrl}" class="btn-secondary w-100" style="text-decoration: none;">
                                    <#if p.iconClasses?has_content>
                                        <i class="${p.iconClasses!}"></i>
                                    </#if>
                                    ${p.displayName!}
                                </a>
                            </li>
                        </#list>
                    </ul>
                </div>
            </#if>

            <#-- Register Link -->
            <#if realm.password && realm.registrationAllowed>
                <div id="kc-info" class="text-center">
                    <div id="kc-info-wrapper">
                        <p class="body-large">
                            ${msg("noAccount")}
                            <a href="${url.registrationUrl}" class="btn-text">
                                ${msg("doRegister")}
                            </a>
                        </p>
                    </div>
                </div>
            </#if>
        </div>
    </div>
</body>
</html>
```

## Common Templates to Customize

### 1. Registration Page (register.ftl)

Similar structure to login.ftl but with additional fields:
- First Name
- Last Name
- Email
- Username (if different from email)
- Password
- Confirm Password

### 2. Error Page (error.ftl)

```html
<div id="kc-container">
    <div id="kc-container-wrapper">
        <div id="kc-header">
            <h1 class="display-large">${msg("errorTitle")}</h1>
        </div>

        <div class="card-header">
            <div class="alert alert-error">
                ${message.summary}
            </div>

            <#if client?? && client.baseUrl?has_content>
                <div class="text-center mt-lg">
                    <a href="${client.baseUrl}" class="btn-primary">
                        ${msg("backToApplication")}
                    </a>
                </div>
            </#if>
        </div>
    </div>
</div>
```

### 3. Password Reset (login-reset-password.ftl)

```html
<form id="kc-form-wrapper" action="${url.loginAction}" method="post">
    <div class="form-group">
        <label for="username" class="form-label">${msg("username")}</label>
        <input
            type="text"
            id="username"
            name="username"
            placeholder="${msg('username')}"
            required
            autofocus
        />
    </div>

    <div id="kc-form-buttons">
        <button type="submit" class="btn-primary">
            ${msg("doSubmit")}
        </button>
    </div>

    <div class="text-center mt-md">
        <a href="${url.loginUrl}" class="btn-link">
            ${msg("backToLogin")}
        </a>
    </div>
</form>
```

### 4. Two-Factor Authentication (login-otp.ftl)

```html
<form id="kc-form-wrapper" action="${url.loginAction}" method="post">
    <div class="form-group">
        <label for="otp" class="form-label">${msg("loginOtpOneTime")}</label>
        <input
            type="text"
            id="otp"
            name="otp"
            placeholder="000000"
            required
            autofocus
            autocomplete="off"
        />
    </div>

    <div id="kc-form-buttons">
        <button type="submit" class="btn-primary">
            ${msg("doSubmit")}
        </button>
    </div>
</form>
```

## Email Template Customization

### Email Verification (email-verification.ftl)

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 14px;
            font-weight: 500;
            line-height: 1.71;
            color: #4A6080;
            background-color: #F7F9FC;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            border-radius: 3px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(7, 47, 103, 0.13);
        }
        .header {
            font-size: 24px;
            font-weight: 700;
            line-height: 1.50;
            color: #4A6080;
            margin-bottom: 16px;
        }
        .button {
            display: inline-block;
            height: 42px;
            padding: 0 50px;
            line-height: 42px;
            border-radius: 8px;
            background-color: #967D55;
            color: #FFFFFF;
            text-decoration: none;
            font-weight: 600;
            margin: 16px 0;
        }
        .footer {
            font-size: 12px;
            color: #5F7087;
            margin-top: 24px;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="header">${msg("emailVerificationSubject")}</h1>
        <p>${msg("emailVerificationBodyHtml",link, linkExpiration, realmName, linkExpirationFormatter(linkExpiration))}</p>
        <a href="${link}" class="button">${msg("emailVerificationButton")}</a>
        <p class="footer">${msg("emailVerificationFooter")}</p>
    </div>
</body>
</html>
```

## Activating the Theme

### In Keycloak Admin Console:

1. Login to Keycloak Admin Console
2. Select your realm
3. Go to **Realm Settings** → **Themes**
4. Set **Login Theme** to `all-about-money`
5. Set **Email Theme** to `all-about-money` (if customized)
6. Click **Save**

### Via Realm JSON:

```json
{
  "realm": "your-realm",
  "loginTheme": "all-about-money",
  "emailTheme": "all-about-money"
}
```

## Testing the Theme

### 1. Direct URL Access

Navigate to:
```
http://your-keycloak-url/realms/your-realm/protocol/openid-connect/auth?client_id=account&redirect_uri=http://localhost&response_type=code
```

### 2. Using Keycloak Account Console

```
http://your-keycloak-url/realms/your-realm/account
```

### 3. Test Different Pages

- Login: `/login`
- Register: `/register`
- Forgot Password: `/login-actions/reset-credentials`
- OTP: Configure 2FA and test login

## Customization Tips

### Adding Your Logo

1. Place logo in `login/resources/img/logo.png`
2. Add to `login.ftl` header:

```html
<div id="kc-header">
    <div id="kc-header-wrapper">
        <img src="${url.resourcesPath}/img/logo.png" alt="Logo" style="max-width: 200px; margin-bottom: 16px;">
        <h1 class="display-large">${msg("loginTitleHtml",(realm.displayNameHtml!''))}</h1>
    </div>
</div>
```

### Changing Button Text

Edit messages in `login/messages/messages_en.properties`:

```properties
doLogIn=Sign In
doRegister=Create Account
doForgotPassword=Forgot Password?
```

### Custom Alert Colors

Add to your CSS for different alert types:

```css
.alert-account-locked {
  background-color: rgba(218, 153, 44, 0.1);
  color: #825E29;
  border-left: 4px solid #DA992C;
}
```

## Color Palette Quick Reference

```css
/* Primary Brand Colors */
--brown-200: #967D55;    /* Buttons */
--yellow-900: #DA992C;   /* Accent */
--blue-700: #4A6080;     /* Text */

/* Backgrounds */
--bg-primary: #F7F9FC;   /* Main background */
--bg-surface: #D6DFF1;   /* Cards/surfaces */

/* Semantic Colors */
--text-positive: #47B240; /* Success */
--text-danger: #852D19;   /* Errors */
```

## Browser Compatibility

The provided CSS is compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For older browsers, consider adding vendor prefixes via autoprefixer.

## Troubleshooting

### Theme not appearing

1. Check Keycloak logs: `standalone/log/server.log`
2. Verify theme directory structure
3. Clear browser cache
4. Restart Keycloak server
5. Check theme.properties syntax

### Styles not loading

1. Verify CSS path in theme.properties
2. Check browser console for 404 errors
3. Ensure file permissions are correct
4. Try hard refresh (Ctrl+Shift+R)

### Font not loading

1. Ensure Google Fonts is accessible from client browser
2. Consider self-hosting Poppins font for offline use
3. Check Content Security Policy settings

## Self-Hosting Poppins Font

If you need to self-host the font:

1. Download Poppins from [Google Fonts](https://fonts.google.com/specimen/Poppins)
2. Place font files in `login/resources/fonts/`
3. Update CSS:

```css
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  src: url('../fonts/Poppins-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  src: url('../fonts/Poppins-Medium.ttf') format('truetype');
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  src: url('../fonts/Poppins-SemiBold.ttf') format('truetype');
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  src: url('../fonts/Poppins-Bold.ttf') format('truetype');
}
```

## Advanced Customization

### Account Management Theme

Copy CSS to `account/resources/css/styles.css` and create matching templates for:
- Account settings
- Password change
- Sessions management
- Authenticator setup

### Admin Console Theme

For consistent branding in admin console:
1. Create `admin/` directory
2. Copy CSS and customize for admin-specific components
3. Update theme.properties:

```properties
parent=keycloak
adminTheme=all-about-money
```

## Support

For Keycloak-specific questions:
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Keycloak Themes Guide](https://www.keycloak.org/docs/latest/server_development/#_themes)

For design system questions:
- Refer to `KEYCLOAK_DESIGN_SYSTEM.md` for complete specifications
- Check Flutter source code in `lib/shared/styles/` for reference implementations
