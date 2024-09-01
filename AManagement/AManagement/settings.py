from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Media settings
MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = '/media/'

# Static files settings
STATIC_URL = 'static/'

# CSRF settings
# CSRF_TRUSTED_ORIGINS = ['http://127.0.0.1:8000', 'https://4425-171-243-49-117.ngrok-free.app']
# Security settings
SECRET_KEY = 'django-insecure-sv2rg0ii4+n$qudt34c5#womke%ol6ubltaaccky9q)um9c)az'
DEBUG = True
ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'Apartment.apps.ApartmentConfig',
    'rest_framework',
    'drf_yasg',
    'oauth2_provider',
    'ckeditor',
    'ckeditor_uploader',
    'corsheaders',
]

AUTH_USER_MODEL = 'Apartment.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
    )
}

CKEDITOR_UPLOAD_PATH = "ckeditors/images/"

# OAUTH2_PROVIDER = {
#     # 'OAUTH2_BACKEND_CLASS': 'oauth2_provider.oauth2_backends.JSONOAuthLibCore'
# }

OAUTH2_PROVIDER = {
    'CLIENT_ID': 'LWntCvujErO8Cx6SiDBZa9lED2QjSj0KRV7flBsv',
    'CLIENT_SECRET': 'fv8ESpuMec5E4PXCWkXb18XQCUXP3a99C85v42KRXb0BS6jzB8VkuYFm8RrOw8geaxXXliQCG4tKEEPSzSESLAlyUntIgHxs8cD5aT86wfDrU3PokcmoSk6nEfh8NBLo'
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'AManagement.urls'

# CLOUDINARY_STORAGE = {
#     'CLOUD_NAME': "dbllquqlo",
#     'API_KEY': "249923572623354",
#     'API_SECRET': "5jVpQoOy-nFxOy4r6D8HT6K1O-M",
#     'SECURE': True
# }

# cloudinary.config(
#     cloud_name = "dbllquqlo",
#     api_key = "249923572623354",
#     api_secret = "5jVpQoOy-nFxOy4r6D8HT6K1O-M", # Click 'View API Keys' above to copy your API secret
#     secure=True
# )


import cloudinary

cloudinary.config(
    cloud_name = "hiendai",
    api_key = "358894412554338",
    api_secret = "achoo--NvftyIBf-7AUzdDgLMZc", # Click 'View Credentials' below to copy your API secret
    # api_proxy = "http://proxy.server:3128"
)
import cloudinary.uploader
import cloudinary.api

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

import cloudinary.uploader
import cloudinary.api


DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'


# CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
# CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',  # Địa chỉ IP hoặc tên miền của ứng dụng React Native
    'http://192.168.1.222:8081:delete',
    'exp://192.168.1.222:8081:delete'  # Ví dụ: địa chỉ IP của Metro bundler
)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'AManagement.wsgi.application'

# Database settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'apartment',
        'USER': 'root',
        'PASSWORD': 'Admin@123',
        'HOST': ''  # mặc định localhost
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Client credentials for OAuth2
