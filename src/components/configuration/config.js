import React, { useState, useEffect, useContext } from 'react';
import helpers from '../../helpers';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import { UserContext } from '../../contexts/UserContext';
import AppContext from '../../contexts/AppContext';
import Wizard from '../configuration/Wizard';
import CryptoJS from 'crypto-js';
import { encryptKeys, encryptSaltKey } from './crypt';
import { useIntl } from 'react-intl'

function Config(props) {
  const intl = useIntl();
  const wizardData = [
    {
      id: 0,
      label: intl.formatMessage({ id: 'googleApi' }),
      icon: 'fa fa-google',
      filterArray: ['google_map_api_key', 'google_login_auth_token', 'facebook_app_id'],
    },
    {
      id: 1,
      label: intl.formatMessage({ id: 'webDefaults' }),
      icon: 'fa fa-globe',
      filterArray: [
        'web',
        'email',
        'bgSong',
        'bgSongDefaultPlay',
        'switchSongFeatureRequired',
        'bgVideo',
        'bgVideoDefaultPlay',
        'switchVideoFeatureRequired',
        'bannerImg',
        'logoImg',
        'favIconImg',
        'webLayoutType',
        'webMenuType',
        'webTheme',
        'switchThemeFeatureRequired',
        'webThemeColor',
        'webThemeBackground',
      ],
    },
    {
      id: 2,
      label: intl.formatMessage({ id: 'AWSS3' }),
      icon: 'fa fa-amazon',
      filterArray: [
        'aws_s3_access_key_id',
        'aws_s3_secret_access_key',
        'aws_s3_bucket',
        'aws_s3_region',
      ],
    },
    {
      id: 3,
      label: intl.formatMessage({ id: 'socialMedia' }),
      icon: 'fa fa-share-square',
      filterArray: [
        'social_media_facebook',
        'social_media_twitter',
        'social_media_linkedIn',
        'social_media_instagram',
        'switchSocialMediaFeatureRequired',
      ],
    },
  ];
  const masterConfig = [
    {
      id: 'config_id',
      index: 'config_id',
      elementType: 'hidden',
      value: '',
      className: '',
    },
    {
      id: 'web',
      index: 'web',
      label: intl.formatMessage({ id: 'website' }),
      elementType: 'text',
      value: '',
      placeHolder: 'johndoe.com',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'enterValidWebsite' }),
        help: [
          intl.formatMessage({ id: 'yourWebDomain' }),
          intl.formatMessage({ id: 'thisValueWillBeSetToYourGlobalVariables' })
        ],
      },
    },
    {
      id: 'email',
      index: 'email',
      label: intl.formatMessage({ id: 'email' }),
      elementType: 'text',
      value: '',
      placeHolder: 'support@johndoe.com',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
        errorMsg: intl.formatMessage({ id: 'enterValidEmail' }),
        help: [
          intl.formatMessage({ id: 'yourPersonalOrCompanyMailId' }),
          intl.formatMessage({ id: 'thisValueWillBeSetToYourGlobalVariables' })
        ],
      },
    },
    {
      id: 'google_map_api_key',
      index: 'google_map_api_key',
      label: intl.formatMessage({ id: 'googleMapApiKey' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'xxYYzz',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howToGetThem' }),
          intl.formatMessage({ id: 'goTo' }, { link: "https://console.cloud.google.com/" }),
          intl.formatMessage({ id: 'scrollAndClickGoogleMapsPlatform' }),
          intl.formatMessage({ id: 'clickValue' }, { value: "Credentials" }),
          intl.formatMessage({ id: 'ClickValueAtTheTopCenter' }, { value: "+Create Credentials" }),
          intl.formatMessage({ id: 'ClickValueAtTheTopCenter' }, { value: "API Key" }),
          intl.formatMessage({ id: 'copyTheGeneratedKey' }),
          intl.formatMessage({ id: 'pasteHereAndSave' }),
          intl.formatMessage({ id: 'youAreDoneGoogleMaps' }),
        ],
      },
    },
    {
      id: 'google_login_auth_token',
      index: 'google_login_auth_token',
      label: intl.formatMessage({ id: 'googleLoginAuthToken' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'xxYYzz',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howToGetThem' }),
          intl.formatMessage({ id: 'goTo' }, { link: "https://console.cloud.google.com/" }),
          intl.formatMessage({ id: 'clickValue' }, { value: "API Services" }),
          intl.formatMessage({ id: 'clickValue' }, { value: "Credentials" }),
          intl.formatMessage({ id: 'ClickValueAtTheTopCenter' }, { value: "+Create Credentials" }),
          intl.formatMessage({ id: 'clickValue' }, { value: "Oauth Client Id" }),
          intl.formatMessage({ id: 'selectWebApplicationGiveaSuitableName' }),
          intl.formatMessage({ id: 'clickValue' }, { value: "Add URI" }),
          intl.formatMessage({ id: 'typeYourDomainUrl' }),
          intl.formatMessage({ id: 'clickValue' }, { value: "Create" }),
          intl.formatMessage({ id: 'copyValue' }, { value: "Client ID" }),
          intl.formatMessage({ id: 'pasteHere' }),
          intl.formatMessage({ id: 'youAreDone' }),
          intl.formatMessage({ id: 'nowYouAllowPublicToLoginViaGoogleLogin' }),
        ],
      },
    },
    {
      id: 'facebook_app_id',
      index: 'facebook_app_id',
      label: 'Facebook App ID',
      elementType: 'textArea',
      value: '',
      placeHolder: '100Xxxxxyyy',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        rowLength: '100',
        validation: /([^\s])/,
        errorMsg: 'Facebook app id required',
        help: [
          `How to get them?`,
          `Go to https://developers.facebook.com/`,
          `Signup an account, if you dont have one`,
          `Once logged in your APP ID will be available on the top header`,
          `Dont forget to toggle "Enforce HTTPS" to Yes`,
          `Copy & Paste here.`,
          `You're done.`,
          `Now you allow public to login via facebook login`,
        ],
      },
    },
    {
      id: 'bgSong',
      index: 'bgSong',
      label: intl.formatMessage({ id: 'themeBackgroundMusic' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://mysong.mp3',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'chooseYourThemeSongPlayableForPeople' }),
          intl.formatMessage({ id: 'ifNotRequiredLeaveaSlash' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery' }),
        ],
      },
    },
    {
      id: 'bgSongDefaultPlay',
      index: 'bgSongDefaultPlay',
      label: intl.formatMessage({ id: 'themeMusicDefaultPlay' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'themeMusicDefaultPlay' }),
      list: [
        { label: intl.formatMessage({ id: 'yes' }), value: 1 },
        { label: intl.formatMessage({ id: 'no' }), value: 0 },
      ],
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'themeBackgroundMusicWillBePlayed' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery' }),
        ],
      },
    },
    {
      id: 'switchSongFeatureRequired',
      index: 'switchSongFeatureRequired',
      label: intl.formatMessage({ id: 'requireBackgroundSongSwitch' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'requireBackgroundSongSwitch' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'yes' }), value: '1' },
        { label: intl.formatMessage({ id: 'no' }), value: '0' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'youCanShowOrHideAudioControl' }),
          intl.formatMessage({ id: 'thisFeatureCanBeEnabledOrDisabled' }),
        ],
      },
    },
    {
      id: 'bgVideo',
      index: 'bgVideo',
      label: intl.formatMessage({ id: 'themeBackgroundVideo' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://my-video.mp4',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'chooseYourThemeVideoWhichPlaysInBackground' }),
          intl.formatMessage({ id: 'dontWorryItWillBeMuted' }),
          intl.formatMessage({ id: 'KeepaSmallVideo' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery' }),
        ],
      },
    },
    {
      id: 'bgVideoDefaultPlay',
      index: 'bgVideoDefaultPlay',
      label: intl.formatMessage({ id: 'themeVideoDefaultPlay' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'themeVideoDefaultPlay' }),
      list: [
        { label: intl.formatMessage({ id: 'yes' }), value: '1' },
        { label: intl.formatMessage({ id: 'no' }), value: '0' },
      ],
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'themeBackgroundVideoWillBePlayed' })],
      },
    },
    {
      id: 'switchVideoFeatureRequired',
      index: 'switchVideoFeatureRequired',
      label: intl.formatMessage({ id: 'requireBackgroundVideoSwitch' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'requireBackgroundVideoSwitch' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'yes' }), value: '1' },
        { label: intl.formatMessage({ id: 'no' }), value: '0' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'youCanShowOrHideVideoControlSwitch' }),
          intl.formatMessage({ id: 'thisFeatureCanBeEnabledOrDisabled' }),
        ],
      },
    },
    {
      id: 'bannerImg',
      index: 'bannerImg',
      label: intl.formatMessage({ id: 'logoImage' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://my-banner-img.svg',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'setYourLogoImage' }),
          intl.formatMessage({ id: 'pngOrSvgTypeIsRecommended' }),
          intl.formatMessage({ id: '200X40DimensionRequired' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery' }),
          intl.formatMessage({ id: 'thisWillBeAvailableInTopGlobalHeader' }),
        ],
      },
    },
    {
      id: 'logoImg',
      index: 'logoImg',
      label: intl.formatMessage({ id: 'logoIcon' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://my-logo.svg',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'setYourLogoIcon' }),
          intl.formatMessage({ id: 'pngOrSvgTypeIsRecommended' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery' }),
        ],
      },
    },
    {
      id: 'favIconImg',
      index: 'favIconImg',
      label: intl.formatMessage({ id: 'faviconImage' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://my-favicon.icon',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'setYourFavicon' }),
          intl.formatMessage({ id: '32X32Or64X64SizeIsSufficient' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery' }),
        ],
      },
    },
    {
      id: 'webLayoutType',
      index: 'webLayoutType',
      label: intl.formatMessage({ id: 'WebLayoutType' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'WebLayoutType' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: 'Default', value: 'default' },
        { label: 'Classic', value: 'classic' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'thisSetupIsOnlyForLargeDisplays' }),
          `Default: ${intl.formatMessage({ id: 'occupiesEntireWidthOfScreen' })}`,
          `Classic: ${intl.formatMessage({ id: 'occupies70%WidthInScreenMiddle' })}`,
        ],
      },
    },
    {
      id: 'webMenuType',
      index: 'webMenuType',
      label: intl.formatMessage({ id: 'WebMenuType' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'WebMenuType' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'top' }), value: 'topMenu' },
        { label: intl.formatMessage({ id: 'left' }), value: 'sideMenuLeft' },
        { label: intl.formatMessage({ id: 'right' }), value: 'sideMenuRight' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'whereYouWantToPlaceYourMenuLinks' }),
        ],
      },
    },
    {
      id: 'webTheme',
      index: 'webTheme',
      label: intl.formatMessage({ id: 'webTheme' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'webTheme' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'dark' }), value: 'dark' },
        { label: intl.formatMessage({ id: 'light' }), value: 'light' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howDoesYourWebsiteLookOnStartUp' }),
          `${intl.formatMessage({ id: 'dark' })} / ${intl.formatMessage({ id: 'light' })}`
        ],
      },
    },
    {
      id: 'switchThemeFeatureRequired',
      index: 'switchThemeFeatureRequired',
      label: intl.formatMessage({ id: 'switchThemeFeatureRequired' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'switchThemeFeatureRequired' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'yes' }), value: '1' },
        { label: intl.formatMessage({ id: 'no' }), value: '0' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'youCanShowOrHideThemeButtons' }),
          intl.formatMessage({ id: 'thisFeatureCanBeEnabledOrDisabled' }),
        ],
      },
    },
    {
      id: 'webThemeColor',
      index: 'webThemeColor',
      label: intl.formatMessage({ id: 'webThemeColor' }),
      elementType: 'text',
      value: '',
      placeHolder: '#000000',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'yourApplicationTextolor' }),
          intl.formatMessage({ id: 'usualyItsBlack' }),
          intl.formatMessage({ id: 'thisDecidesTheLookAndFeelOfYourApplication' }),
        ],
      },
    },
    {
      id: 'webThemeBackground',
      index: 'webThemeBackground',
      label: intl.formatMessage({ id: 'webThemeBackgroundColor' }),
      elementType: 'text',
      value: '',
      placeHolder: '#c2d82e',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'yourApplicationBackgroundColor' }),
          intl.formatMessage({ id: 'itShouldBeaLightColor' }),
          intl.formatMessage({ id: 'thisDecidesTheLookAndFeelOfYourApplication' }),
        ],
      },
    },
    {
      id: 'aws_s3_access_key_id',
      index: 'aws_s3_access_key_id',
      label: intl.formatMessage({ id: 'awsS3AccessKeyId' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'XXXyyyZZZ',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howToGetThem' }),
          intl.formatMessage({ id: 'hopeYouHaveCreatedAnAwsS3Account' }),
          intl.formatMessage({ id: 'goTo' }, { link: "https://s3.console.aws.amazon.com/" }),
          intl.formatMessage({ id: 'youllSeeThisKeyWhileAddingUserInCreateUserSection' }),
          intl.formatMessage({ id: 'youNeedToCopyPasteBackup' }),
          intl.formatMessage({ id: 'thisConfigurationIsImportantToMedia' }),
          intl.formatMessage({ id: 'awsS3AccessKeyImportant' }, { adminAccess: "AdministratorAccess" }),
        ],
      },
    },
    {
      id: 'aws_s3_secret_access_key',
      index: 'aws_s3_secret_access_key',
      label: intl.formatMessage({ id: 'awsS3SecretAccessKey' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'XXXyyyZZZ',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'followSameAsInAwsS3AccessKeyId' })],
      },
    },
    {
      id: 'aws_s3_bucket',
      index: 'aws_s3_bucket',
      label: intl.formatMessage({ id: 'awsS3BucketName' }),
      elementType: 'text',
      value: '',
      placeHolder: 'My-S3-Bucket',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howToGetThem' }),
          intl.formatMessage({ id: 'hopeYouHaveCreatedAnAwsS3Account' }),
          intl.formatMessage({ id: 'goTo' }, { link: "https://s3.console.aws.amazon.com/" }),
          intl.formatMessage({ id: 'createBucket' }, { bucket: "bucket" }),
          intl.formatMessage({ id: 'onceCreatedClickTheBucketName' }, { bucket: "bucket" }),
          intl.formatMessage({ id: 'goToPermissionsTab' }),
          intl.formatMessage({ id: 'checkBlockPublicAccessIsOn' }, { publicAccessOn: "Block public access" }),
          intl.formatMessage({ id: 'GotoBucketEditReplaceCredentials' }, { bucketPolicy: "Bucket policy" }),
          `{
            "Version": "2012-10-17",
            "Statement": [
              {
                "Sid": "Statement1",
                "Effect": "Allow",
                "Principal": {
                  "AWS": "arn:aws:iam::12345678:user/xxxyyyzzz"
                },
                "Action": [
                  "s3:PutObject",
                  "s3:PutObjectAcl",
                  "s3:DeleteObject"
                ],
                "Resource": "arn:aws:s3:::yourbucketname/*"
              }
            ]
          }`,
          intl.formatMessage({ id: 'goTo' }, { link: "Cross-origin resource sharing (CORS)" }),
          intl.formatMessage({ id: 'editAndReplaceCodeWithCredentials' }),
          `[
            {
              "AllowedHeaders": [
                "*"
              ],
              "AllowedMethods": [
                "GET",
                "PUT",
                "POST",
                "DELETE"
              ],
              "AllowedOrigins": [
                "https://yourwebsite.com"
              ],
              "ExposeHeaders": [
                "ETag"
              ]
            }
          ]`,
          intl.formatMessage({ id: 'youAreDone' }),
        ],
      },
    },
    {
      id: 'aws_s3_region',
      index: 'aws_s3_region',
      label: intl.formatMessage({ id: 'awsS3RegionName' }),
      elementType: 'text',
      value: '',
      placeHolder: 'xx-south-yy',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howToGetThem' }),
          intl.formatMessage({ id: 'hopeYouHaveCreatedAnAwsS3Account' }),
          intl.formatMessage({ id: 'hopeYouHaveCreatedAnAwsS3Account' }, { region: "Region", bucket: "Bucket" }),
          intl.formatMessage({ id: 'thisHelpsFetchAwsServer' }),
          intl.formatMessage({ id: 'thisConfigurationIsImportantToMedia' }),
        ],
      },
    },
    {
      id: 'social_media_facebook',
      index: 'social_media_facebook',
      label: intl.formatMessage({ id: 'facebook' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://facebook.com/xyz',
      className: 'col-md-4 col-sm-6',
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'yourSocialProfileLink' }, { media: "facebook" })],
      },
    },
    {
      id: 'social_media_twitter',
      index: 'social_media_twitter',
      label: intl.formatMessage({ id: 'twitter' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://twitter.com/xyz',
      className: 'col-md-4 col-sm-6',
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'yourSocialProfileLink' }, { media: "twitter" })],
      },
    },
    {
      id: 'social_media_linkedIn',
      index: 'social_media_linkedIn',
      label: intl.formatMessage({ id: 'linkedIn' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://linkedIn.com/xyz',
      className: 'col-md-4 col-sm-6',
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'yourSocialProfileLink' }, { media: "linkedIn" })],
      },
    },
    {
      id: 'social_media_instagram',
      index: 'social_media_instagram',
      label: '',
      elementType: 'textArea',
      label: intl.formatMessage({ id: 'instagram' }),
      placeHolder: 'https://instagram.com/xyz',
      className: 'col-md-4 col-sm-6',
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'yourSocialProfileLink' }, { media: "instagram" })],
      },
    },
    {
      id: 'switchSocialMediaFeatureRequired',
      index: 'switchSocialMediaFeatureRequired',
      label: intl.formatMessage({ id: 'switchSocialMediaFeatureRequired' }),
      elementType: 'dropDown',
      value: '',
      label: intl.formatMessage({ id: 'switchSocialMediaFeatureRequired' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'yes' }), value: '1' },
        { label: intl.formatMessage({ id: 'no' }), value: '0' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'youCanShowOrHideSocialMediaLinks' }),
          intl.formatMessage({ id: 'thisFeatureCanBeEnabledOrDisabled' }),
        ],
      },
    },
  ];
  const userContext = useContext(UserContext);
  const [appData, setMaster] = useContext(AppContext);
  const [formStructure, setFormStructure] = useState(masterConfig);
  const [loader, setLoader] = useState(true);

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append('TableRows', TableRows);
    formdata.append('Table', Table);
    return apiInstance.post('getBackend', formdata);
  };

  useEffect(() => {
    setLoader(true);
    const TableRows = formStructure.map(form => form.index);
    getBackendAjax('config', TableRows)
      .then(r => {
        const responseObject = r.data.response[0];
        const responseArray = Object.keys(responseObject);
        let backupStructure = [...formStructure];
        backupStructure = backupStructure.map(backup => {
          if (responseArray.includes(backup.index)) {
            backup.value = encryptKeys.includes(backup.index)
              ? CryptoJS.AES.decrypt(
                responseObject[backup.index],
                appData[encryptSaltKey]
              ).toString(CryptoJS.enc.Utf8)
              : responseObject[backup.index];
          }
          return backup;
        });
        setFormStructure(backupStructure);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [JSON.stringify(appData)]);

  const onMassagePayload = (index, value) => {
    let backupStructure = [...formStructure];
    backupStructure = backupStructure.map(backup => {
      if (backup.id === index) {
        backup.value = value;
      }
      return backup;
    });
    setFormStructure(backupStructure);
  };

  const onReactiveFormSubmit = () => {
    setLoader(true);
    const salt = [...formStructure].filter(f => f.id === encryptSaltKey)[0]
      .value;
    let payload = [...formStructure].map(f => ({
      [f.id]: encryptKeys.includes(f.id)
        ? CryptoJS.AES.encrypt(f.value, salt).toString()
        : f.value,
    }));
    payload = Object.assign({}, ...payload);
    const newPayload = {
      Table: 'config',
      updateData: [payload],
    };
    const formdata = new FormData();
    formdata.append('postData', JSON.stringify(newPayload));

    apiInstance
      .post('/postBackend', formdata)
      .then(res => {
        if (res.data.response) {
          let backupStructure = [...formStructure];
          const bPayLoad = Object.keys(payload);
          backupStructure = backupStructure.map(backup => {
            if (bPayLoad.includes(backup.index)) {
              backup.value = payload[backup.index];
            }
            return backup;
          });
          setFormStructure(backupStructure);
          userContext.renderToast({
            message: intl.formatMessage({ id: 'transactionSavedSuccessfully' }),
          });
          let massageStructure = backupStructure.map(b => [b.id, b.value]);
          massageStructure = Object.fromEntries(massageStructure);
          setMaster(massageStructure);
        }
      })
      .catch(e =>
        userContext.renderToast({
          type: 'error',
          icon: 'fa fa-times-circle',
          message: intl.formatMessage({ id: 'unableToReachServer' }),
        })
      )
      .finally(() => setLoader(false));
  };

  return (
    <div className="">
      {loader ? (
        <div className="text-center mt-100">
          <Loader
            type={helpers.loadRandomSpinnerIcon()}
            color={document.documentElement.style.getPropertyValue(
              '--app-theme-bg-color'
            )}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className="">
          {
            <Wizard
              key={1}
              data={formStructure}
              menu={wizardData}
              onMassagePayload={onMassagePayload}
              onReactiveFormSubmit={onReactiveFormSubmit}
            />
          }
        </div>
      )}
    </div>
  );
}
export default Config;
