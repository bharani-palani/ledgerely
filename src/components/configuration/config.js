import React, { useState, useEffect, useContext } from 'react';
import helpers from '../../helpers';
import apiInstance from '../../services/apiServices';
import Loader from 'react-loader-spinner';
import { UserContext } from '../../contexts/UserContext';
import AppContext from '../../contexts/AppContext';
import Wizard from '../configuration/Wizard';
import CryptoJS from 'crypto-js';
import Encryption from '../../helpers/clientServerEncrypt';
import { encryptKeys, encryptSaltKey, clientServerEncryptKeys } from './crypt';
import { useIntl } from 'react-intl'


function Config(props) {
  const intl = useIntl();
  const wizardData = [
    {
      id: 0,
      label: intl.formatMessage({ id: 'googleApi', defaultMessage: 'googleApi' }),
      icon: 'fa fa-google',
      filterArray: ['google_map_api_key', 'google_login_auth_token', 'facebook_app_id'],
    },
    {
      id: 1,
      label: intl.formatMessage({ id: 'webDefaults', defaultMessage: 'webDefaults' }),
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
      label: intl.formatMessage({ id: 'fileStorage', defaultMessage: 'fileStorage' }),
      icon: 'fa fa-database',
      filterArray: [
        'fileStorageType',
        'aws_s3_access_key_id',
        'aws_s3_secret_access_key',
        'aws_s3_bucket',
        'aws_s3_region',
        'fileStorageAccessKey'
      ],
    },
    {
      id: 3,
      label: intl.formatMessage({ id: 'socialMedia', defaultMessage: 'socialMedia' }),
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
      label: intl.formatMessage({ id: 'website', defaultMessage: 'website' }),
      elementType: 'text',
      value: '',
      placeHolder: 'johndoe.com',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'enterValidWebsite', defaultMessage: 'enterValidWebsite' }),
        help: [
          intl.formatMessage({ id: 'yourWebDomain', defaultMessage: 'yourWebDomain' }),
          intl.formatMessage({ id: 'thisValueWillBeSetToYourGlobalVariables', defaultMessage: 'thisValueWillBeSetToYourGlobalVariables' })
        ],
      },
    },
    {
      id: 'email',
      index: 'email',
      label: intl.formatMessage({ id: 'email', defaultMessage: 'email' }),
      elementType: 'text',
      value: '',
      placeHolder: 'support@johndoe.com',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
        errorMsg: intl.formatMessage({ id: 'enterValidEmail', defaultMessage: 'enterValidEmail' }),
        help: [
          intl.formatMessage({ id: 'yourPersonalOrCompanyMailId', defaultMessage: 'yourPersonalOrCompanyMailId' }),
          intl.formatMessage({ id: 'thisValueWillBeSetToYourGlobalVariables', defaultMessage: 'thisValueWillBeSetToYourGlobalVariables' })
        ],
      },
    },
    {
      id: 'google_map_api_key',
      index: 'google_map_api_key',
      label: intl.formatMessage({ id: 'googleMapApiKey', defaultMessage: 'googleMapApiKey' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'xxYYzz',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howToGetThem', defaultMessage: 'howToGetThem' }),
          intl.formatMessage({ id: 'goTo', defaultMessage: 'goTo' }, { link: "https://console.cloud.google.com/" }),
          intl.formatMessage({ id: 'scrollAndClickGoogleMapsPlatform', defaultMessage: 'scrollAndClickGoogleMapsPlatform' }),
          intl.formatMessage({ id: 'clickValue', defaultMessage: 'clickValue' }, { value: "Credentials" }),
          intl.formatMessage({ id: 'ClickValueAtTheTopCenter', defaultMessage: 'ClickValueAtTheTopCenter' }, { value: "+Create Credentials" }),
          intl.formatMessage({ id: 'ClickValueAtTheTopCenter', defaultMessage: 'ClickValueAtTheTopCenter' }, { value: "API Key" }),
          intl.formatMessage({ id: 'copyTheGeneratedKey', defaultMessage: 'copyTheGeneratedKey' }),
          intl.formatMessage({ id: 'pasteHereAndSave', defaultMessage: 'pasteHereAndSave' }),
          intl.formatMessage({ id: 'youAreDoneGoogleMaps', defaultMessage: 'youAreDoneGoogleMaps' }),
        ],
      },
    },
    {
      id: 'google_login_auth_token',
      index: 'google_login_auth_token',
      label: intl.formatMessage({ id: 'googleLoginAuthToken', defaultMessage: 'googleLoginAuthToken' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'xxYYzz',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howToGetThem', defaultMessage: 'howToGetThem' }),
          intl.formatMessage({ id: 'goTo', defaultMessage: 'goTo' }, { link: "https://console.cloud.google.com/" }),
          intl.formatMessage({ id: 'clickValue', defaultMessage: 'clickValue' }, { value: "API Services" }),
          intl.formatMessage({ id: 'clickValue', defaultMessage: 'clickValue' }, { value: "Credentials" }),
          intl.formatMessage({ id: 'ClickValueAtTheTopCenter', defaultMessage: 'ClickValueAtTheTopCenter' }, { value: "+Create Credentials" }),
          intl.formatMessage({ id: 'clickValue', defaultMessage: 'clickValue' }, { value: "Oauth Client Id" }),
          intl.formatMessage({ id: 'selectWebApplicationGiveaSuitableName', defaultMessage: 'selectWebApplicationGiveaSuitableName' }),
          intl.formatMessage({ id: 'clickValue', defaultMessage: 'clickValue' }, { value: "Add URI" }),
          intl.formatMessage({ id: 'typeYourDomainUrl', defaultMessage: 'typeYourDomainUrl' }),
          intl.formatMessage({ id: 'clickValue', defaultMessage: 'clickValue' }, { value: "Create" }),
          intl.formatMessage({ id: 'copyValue', defaultMessage: 'copyValue' }, { value: "Client ID" }),
          intl.formatMessage({ id: 'pasteHere', defaultMessage: 'pasteHere' }),
          intl.formatMessage({ id: 'youAreDone', defaultMessage: 'youAreDone' }),
          intl.formatMessage({ id: 'nowYouAllowPublicToLoginViaGoogleLogin', defaultMessage: 'nowYouAllowPublicToLoginViaGoogleLogin' }),
        ],
      },
    },
    {
      id: 'facebook_app_id',
      index: 'facebook_app_id',
      label: intl.formatMessage({ id: 'facebookAppId', defaultMessage: 'facebookAppId' }),
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
          intl.formatMessage({ id: 'howToGetThem', defaultMessage: 'howToGetThem' }),
          intl.formatMessage({ id: 'goTo', defaultMessage: 'goTo' }, { link: "https://developers.facebook.com/" }),
          intl.formatMessage({ id: 'signupAnAccountIfYouDontHaveOne', defaultMessage: 'signupAnAccountIfYouDontHaveOne' }),
          intl.formatMessage({ id: 'onceLoggedInYourAppIdWillBeVvailableOnTheTopHeader', defaultMessage: 'onceLoggedInYourAppIdWillBeVvailableOnTheTopHeader' }),
          intl.formatMessage({ id: 'dontForgetToToggleEnforceHttpsToYes', defaultMessage: 'dontForgetToToggleEnforceHttpsToYes' }),
          intl.formatMessage({ id: 'copyPasteHere', defaultMessage: 'copyPasteHere' }),
          intl.formatMessage({ id: 'youAreDone', defaultMessage: 'youAreDone' }),
          intl.formatMessage({ id: 'nowYouAllowPublicToLoginViaFacebookLogin', defaultMessage: 'nowYouAllowPublicToLoginViaFacebookLogin' }),
        ],
      },
    },
    {
      id: 'bgSong',
      index: 'bgSong',
      label: intl.formatMessage({ id: 'themeBackgroundMusic', defaultMessage: 'themeBackgroundMusic' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://mysong.mp3',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'chooseYourThemeSongPlayableForPeople', defaultMessage: 'chooseYourThemeSongPlayableForPeople' }),
          intl.formatMessage({ id: 'ifNotRequiredLeaveaSlash', defaultMessage: 'ifNotRequiredLeaveaSlash' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery', defaultMessage: 'ifRequiredPasteItFromAwsGallery' }),
        ],
      },
    },
    {
      id: 'bgSongDefaultPlay',
      index: 'bgSongDefaultPlay',
      label: intl.formatMessage({ id: 'themeMusicDefaultPlay', defaultMessage: 'themeMusicDefaultPlay' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'select', defaultMessage: 'select' }),
      list: [
        { label: intl.formatMessage({ id: 'yes', defaultMessage: 'yes' }), value: 1 },
        { label: intl.formatMessage({ id: 'no', defaultMessage: 'no' }), value: 0 },
      ],
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'themeBackgroundMusicWillBePlayed', defaultMessage: 'themeBackgroundMusicWillBePlayed' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery', defaultMessage: 'ifRequiredPasteItFromAwsGallery' }),
        ],
      },
    },
    {
      id: 'switchSongFeatureRequired',
      index: 'switchSongFeatureRequired',
      label: intl.formatMessage({ id: 'requireBackgroundSongSwitch', defaultMessage: 'requireBackgroundSongSwitch' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'select', defaultMessage: 'select' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'yes', defaultMessage: 'yes' }), value: '1' },
        { label: intl.formatMessage({ id: 'no', defaultMessage: 'no' }), value: '0' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'youCanShowOrHideAudioControl', defaultMessage: 'youCanShowOrHideAudioControl' }),
          intl.formatMessage({ id: 'thisFeatureCanBeEnabledOrDisabled', defaultMessage: 'thisFeatureCanBeEnabledOrDisabled' }),
        ],
      },
    },
    {
      id: 'bgVideo',
      index: 'bgVideo',
      label: intl.formatMessage({ id: 'themeBackgroundVideo', defaultMessage: 'themeBackgroundVideo' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://my-video.mp4',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'chooseYourThemeVideoWhichPlaysInBackground', defaultMessage: 'chooseYourThemeVideoWhichPlaysInBackground' }),
          intl.formatMessage({ id: 'dontWorryItWillBeMuted', defaultMessage: 'dontWorryItWillBeMuted' }),
          intl.formatMessage({ id: 'KeepaSmallVideo', defaultMessage: 'KeepaSmallVideo' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery', defaultMessage: 'ifRequiredPasteItFromAwsGallery' }),
        ],
      },
    },
    {
      id: 'bgVideoDefaultPlay',
      index: 'bgVideoDefaultPlay',
      label: intl.formatMessage({ id: 'themeVideoDefaultPlay', defaultMessage: 'themeVideoDefaultPlay' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'select', defaultMessage: 'select' }),
      list: [
        { label: intl.formatMessage({ id: 'yes', defaultMessage: 'yes' }), value: '1' },
        { label: intl.formatMessage({ id: 'no', defaultMessage: 'no' }), value: '0' },
      ],
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'themeBackgroundVideoWillBePlayed', defaultMessage: 'themeBackgroundVideoWillBePlayed' })],
      },
    },
    {
      id: 'switchVideoFeatureRequired',
      index: 'switchVideoFeatureRequired',
      label: intl.formatMessage({ id: 'requireBackgroundVideoSwitch', defaultMessage: 'requireBackgroundVideoSwitch' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'select', defaultMessage: 'select' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'yes', defaultMessage: 'yes' }), value: '1' },
        { label: intl.formatMessage({ id: 'no', defaultMessage: 'no' }), value: '0' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'youCanShowOrHideVideoControlSwitch', defaultMessage: 'youCanShowOrHideVideoControlSwitch' }),
          intl.formatMessage({ id: 'thisFeatureCanBeEnabledOrDisabled', defaultMessage: 'thisFeatureCanBeEnabledOrDisabled' }),
        ],
      },
    },
    {
      id: 'bannerImg',
      index: 'bannerImg',
      label: intl.formatMessage({ id: 'logoImage', defaultMessage: 'logoImage' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://my-banner-img.svg',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'setYourLogoImage', defaultMessage: 'setYourLogoImage' }),
          intl.formatMessage({ id: 'pngOrSvgTypeIsRecommended', defaultMessage: 'pngOrSvgTypeIsRecommended' }),
          intl.formatMessage({ id: '200X40DimensionRequired', defaultMessage: '200X40DimensionRequired' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery', defaultMessage: 'ifRequiredPasteItFromAwsGallery' }),
          intl.formatMessage({ id: 'thisWillBeAvailableInTopGlobalHeader', defaultMessage: 'thisWillBeAvailableInTopGlobalHeader' }),
        ],
      },
    },
    {
      id: 'logoImg',
      index: 'logoImg',
      label: intl.formatMessage({ id: 'logoIcon', defaultMessage: 'logoIcon' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://my-logo.svg',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'setYourLogoIcon', defaultMessage: 'setYourLogoIcon' }),
          intl.formatMessage({ id: 'pngOrSvgTypeIsRecommended', defaultMessage: 'pngOrSvgTypeIsRecommended' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery', defaultMessage: 'ifRequiredPasteItFromAwsGallery' }),
        ],
      },
    },
    {
      id: 'favIconImg',
      index: 'favIconImg',
      label: intl.formatMessage({ id: 'faviconImage', defaultMessage: 'faviconImage' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://my-favicon.icon',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'setYourFavicon', defaultMessage: 'setYourFavicon' }),
          intl.formatMessage({ id: '32X32Or64X64SizeIsSufficient', defaultMessage: '32X32Or64X64SizeIsSufficient' }),
          intl.formatMessage({ id: 'ifRequiredPasteItFromAwsGallery', defaultMessage: 'ifRequiredPasteItFromAwsGallery' }),
        ],
      },
    },
    {
      id: 'webLayoutType',
      index: 'webLayoutType',
      label: intl.formatMessage({ id: 'WebLayoutType', defaultMessage: 'WebLayoutType' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'select', defaultMessage: 'select' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: 'Default', value: 'default' },
        { label: 'Classic', value: 'classic' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'thisSetupIsOnlyForLargeDisplays', defaultMessage: 'thisSetupIsOnlyForLargeDisplays' }),
          `Default: ${intl.formatMessage({ id: 'occupiesEntireWidthOfScreen', defaultMessage: 'occupiesEntireWidthOfScreen' })}`,
          `Classic: ${intl.formatMessage({ id: 'occupies70%WidthInScreenMiddle', defaultMessage: 'occupies70%WidthInScreenMiddle' })}`,
        ],
      },
    },
    {
      id: 'webMenuType',
      index: 'webMenuType',
      label: intl.formatMessage({ id: 'WebMenuType', defaultMessage: 'WebMenuType' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'select', defaultMessage: 'select' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'top', defaultMessage: 'top' }), value: 'topMenu' },
        { label: intl.formatMessage({ id: 'left', defaultMessage: 'left' }), value: 'sideMenuLeft' },
        { label: intl.formatMessage({ id: 'right', defaultMessage: 'right' }), value: 'sideMenuRight' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'whereYouWantToPlaceYourMenuLinks', defaultMessage: 'whereYouWantToPlaceYourMenuLinks' }),
        ],
      },
    },
    {
      id: 'webTheme',
      index: 'webTheme',
      label: intl.formatMessage({ id: 'webTheme', defaultMessage: 'webTheme' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'select', defaultMessage: 'select' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'dark', defaultMessage: 'dark' }), value: 'dark' },
        { label: intl.formatMessage({ id: 'light', defaultMessage: 'light'  }), value: 'light' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howDoesYourWebsiteLookOnStartUp', defaultMessage: 'howDoesYourWebsiteLookOnStartUp' }),
          `${intl.formatMessage({ id: 'dark', defaultMessage: 'dark' })} / ${intl.formatMessage({ id: 'light', defaultMessage: 'light' })}`
        ],
      },
    },
    {
      id: 'switchThemeFeatureRequired',
      index: 'switchThemeFeatureRequired',
      label: intl.formatMessage({ id: 'switchThemeFeatureRequired', defaultMessage: 'switchThemeFeatureRequired' }),
      elementType: 'dropDown',
      value: '',
      placeHolder: intl.formatMessage({ id: 'select', defaultMessage: 'select' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'yes', defaultMessage: 'yes' }), value: '1' },
        { label: intl.formatMessage({ id: 'no', defaultMessage: 'no' }), value: '0' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'youCanShowOrHideThemeButtons', defaultMessage: 'youCanShowOrHideThemeButtons' }),
          intl.formatMessage({ id: 'thisFeatureCanBeEnabledOrDisabled', defaultMessage: 'thisFeatureCanBeEnabledOrDisabled' }),
        ],
      },
    },
    {
      id: 'webThemeColor',
      index: 'webThemeColor',
      label: intl.formatMessage({ id: 'webThemeColor', defaultMessage: 'webThemeColor' }),
      elementType: 'text',
      value: '',
      placeHolder: '#000000',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'yourApplicationTextolor', defaultMessage: 'yourApplicationTextolor' }),
          intl.formatMessage({ id: 'usualyItsBlack', defaultMessage: 'usualyItsBlack' }),
          intl.formatMessage({ id: 'thisDecidesTheLookAndFeelOfYourApplication', defaultMessage: 'thisDecidesTheLookAndFeelOfYourApplication' }),
        ],
      },
    },
    {
      id: 'webThemeBackground',
      index: 'webThemeBackground',
      label: intl.formatMessage({ id: 'webThemeBackgroundColor', defaultMessage: 'webThemeBackgroundColor' }),
      elementType: 'text',
      value: '',
      placeHolder: '#c2d82e',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'yourApplicationBackgroundColor', defaultMessage: 'yourApplicationBackgroundColor' }),
          intl.formatMessage({ id: 'itShouldBeaLightColor', defaultMessage: 'itShouldBeaLightColor' }),
          intl.formatMessage({ id: 'thisDecidesTheLookAndFeelOfYourApplication', defaultMessage: 'thisDecidesTheLookAndFeelOfYourApplication' }),
        ],
      },
    },
    {
      id: 'fileStorageType',
      index: 'fileStorageType',
      label: intl.formatMessage({ id: 'fileStorageType', defaultMessage: 'fileStorageType' }),
      elementType: 'dropDown',
      sort: 0,
      value: '',
      placeHolder: intl.formatMessage({ id: 'select', defaultMessage: 'select' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'self', defaultMessage: 'self' }), value: 'SELF' },
        { label: intl.formatMessage({ id: 'AWSS3', defaultMessage: 'AWSS3' }), value: 'AWSS3' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'helpFileStorageType', defaultMessage: 'helpFileStorageType' }),
        ],
      },
    },
    {
      id: 'aws_s3_access_key_id',
      index: 'aws_s3_access_key_id',
      label: intl.formatMessage({ id: 'awsS3AccessKeyId', defaultMessage: 'awsS3AccessKeyId' }),
      elementType: 'text',
      sort: 1,
      value: '',
      placeHolder: 'XXXyyyZZZ',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howToGetThem', defaultMessage: 'howToGetThem' }),
          intl.formatMessage({ id: 'hopeYouHaveCreatedAnAwsS3Account', defaultMessage: 'hopeYouHaveCreatedAnAwsS3Account' }),
          intl.formatMessage({ id: 'goTo', defaultMessage: 'goTo' }, { link: "https://s3.console.aws.amazon.com/" }),
          intl.formatMessage({ id: 'youllSeeThisKeyWhileAddingUserInCreateUserSection', defaultMessage: 'youllSeeThisKeyWhileAddingUserInCreateUserSection' }),
          intl.formatMessage({ id: 'youNeedToCopyPasteBackup', defaultMessage: 'youNeedToCopyPasteBackup' }),
          intl.formatMessage({ id: 'thisConfigurationIsImportantToMedia', defaultMessage: 'thisConfigurationIsImportantToMedia' }),
          intl.formatMessage({ id: 'awsS3AccessKeyImportant', defaultMessage: 'awsS3AccessKeyImportant' }, { adminAccess: "AdministratorAccess" }),
        ],
      },
    },
    {
      id: 'aws_s3_secret_access_key',
      index: 'aws_s3_secret_access_key',
      label: intl.formatMessage({ id: 'awsS3SecretAccessKey', defaultMessage: 'awsS3SecretAccessKey' }),
      elementType: 'text',
      sort: 2,
      value: '',
      placeHolder: 'XXXyyyZZZ',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'followSameAsInAwsS3AccessKeyId', defaultMessage: 'followSameAsInAwsS3AccessKeyId' })],
      },
    },
    {
      id: 'aws_s3_bucket',
      index: 'aws_s3_bucket',
      label: intl.formatMessage({ id: 'awsS3BucketName', defaultMessage: 'awsS3BucketName' }),
      elementType: 'text',
      sort: 3,
      value: '',
      placeHolder: 'My-S3-Bucket',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howToGetThem', defaultMessage: 'howToGetThem' }),
          intl.formatMessage({ id: 'hopeYouHaveCreatedAnAwsS3Account', defaultMessage: 'hopeYouHaveCreatedAnAwsS3Account' }),
          intl.formatMessage({ id: 'goTo', defaultMessage: 'goTo' }, { link: "https://s3.console.aws.amazon.com/" }),
          intl.formatMessage({ id: 'createBucket', defaultMessage: 'createBucket' }, { bucket: "bucket" }),
          intl.formatMessage({ id: 'onceCreatedClickTheBucketName', defaultMessage: 'onceCreatedClickTheBucketName' }, { bucket: "bucket" }),
          intl.formatMessage({ id: 'goToPermissionsTab', defaultMessage: 'goToPermissionsTab' }),
          intl.formatMessage({ id: 'checkBlockPublicAccessIsOn', defaultMessage: 'checkBlockPublicAccessIsOn' }, { publicAccessOn: "Block public access" }),
          intl.formatMessage({ id: 'GotoBucketEditReplaceCredentials', defaultMessage: 'GotoBucketEditReplaceCredentials' }, { bucketPolicy: "Bucket policy" }),
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
          intl.formatMessage({ id: 'goTo', defaultMessage: 'goTo' }, { link: "Cross-origin resource sharing (CORS)" }),
          intl.formatMessage({ id: 'editAndReplaceCodeWithCredentials', defaultMessage: 'editAndReplaceCodeWithCredentials' }),
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
          intl.formatMessage({ id: 'youAreDone', defaultMessage: 'youAreDone' }),
        ],
      },
    },
    {
      id: 'aws_s3_region',
      index: 'aws_s3_region',
      label: intl.formatMessage({ id: 'awsS3RegionName', defaultMessage: 'awsS3RegionName' }),
      elementType: 'text',
      sort: 4,
      value: '',
      placeHolder: 'xx-south-yy',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howToGetThem', defaultMessage: 'howToGetThem' }),
          intl.formatMessage({ id: 'hopeYouHaveCreatedAnAwsS3Account', defaultMessage: 'hopeYouHaveCreatedAnAwsS3Account' }, { region: "Region", bucket: "Bucket" }),
          intl.formatMessage({ id: 'thisHelpsFetchAwsServer', defaultMessage: 'thisHelpsFetchAwsServer' }),
          intl.formatMessage({ id: 'thisConfigurationIsImportantToMedia', defaultMessage: 'thisConfigurationIsImportantToMedia' }),
        ],
      },
    },
    {
      id: 'fileStorageAccessKey',
      index: 'fileStorageAccessKey',
      label: intl.formatMessage({ id: 'fileStorageAccessKey', defaultMessage: 'fileStorageAccessKey' }),
      elementType: 'text',
      sort: 4,
      value: '',
      placeHolder: 'ABCXYZ0123',
      className: 'col-md-4 col-sm-6',
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'howToGetThem', defaultMessage: 'howToGetThem' }),
        ],
      },
    },
    {
      id: 'social_media_facebook',
      index: 'social_media_facebook',
      label: intl.formatMessage({ id: 'facebook', defaultMessage: 'facebook' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://facebook.com/xyz',
      className: 'col-md-4 col-sm-6',
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'yourSocialProfileLink', defaultMessage: 'yourSocialProfileLink' }, { media: "facebook" })],
      },
    },
    {
      id: 'social_media_twitter',
      index: 'social_media_twitter',
      label: intl.formatMessage({ id: 'twitter', defaultMessage: 'twitter' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://twitter.com/xyz',
      className: 'col-md-4 col-sm-6',
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'yourSocialProfileLink', defaultMessage: 'yourSocialProfileLink' }, { media: "twitter" })],
      },
    },
    {
      id: 'social_media_linkedIn',
      index: 'social_media_linkedIn',
      label: intl.formatMessage({ id: 'linkedIn', defaultMessage: 'linkedIn' }),
      elementType: 'textArea',
      value: '',
      placeHolder: 'https://linkedIn.com/xyz',
      className: 'col-md-4 col-sm-6',
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'yourSocialProfileLink', defaultMessage: 'yourSocialProfileLink' }, { media: "linkedIn" })],
      },
    },
    {
      id: 'social_media_instagram',
      index: 'social_media_instagram',
      label: '',
      elementType: 'textArea',
      label: intl.formatMessage({ id: 'instagram', defaultMessage: 'instagram' }),
      placeHolder: 'https://instagram.com/xyz',
      className: 'col-md-4 col-sm-6',
      options: {
        validation: /$/,
        rowLength: 100,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [intl.formatMessage({ id: 'yourSocialProfileLink', defaultMessage: 'yourSocialProfileLink' }, { media: "instagram" })],
      },
    },
    {
      id: 'switchSocialMediaFeatureRequired',
      index: 'switchSocialMediaFeatureRequired',
      label: intl.formatMessage({ id: 'switchSocialMediaFeatureRequired', defaultMessage: 'switchSocialMediaFeatureRequired' }),
      elementType: 'dropDown',
      value: '',
      label: intl.formatMessage({ id: 'select', defaultMessage: 'select' }),
      className: 'col-md-4 col-sm-6',
      list: [
        { label: intl.formatMessage({ id: 'yes', defaultMessage: 'yes' }), value: '1' },
        { label: intl.formatMessage({ id: 'no', defaultMessage: 'no' }), value: '0' },
      ],
      options: {
        required: true,
        validation: /([^\s])/,
        errorMsg: intl.formatMessage({ id: 'thisFieldIsRequired', defaultMessage: 'thisFieldIsRequired' }),
        help: [
          intl.formatMessage({ id: 'youCanShowOrHideSocialMediaLinks', defaultMessage: 'youCanShowOrHideSocialMediaLinks' }),
          intl.formatMessage({ id: 'thisFeatureCanBeEnabledOrDisabled', defaultMessage: 'thisFeatureCanBeEnabledOrDisabled' }),
        ],
      },
    },
  ];
  const userContext = useContext(UserContext);
  const [appData, setMaster] = useContext(AppContext);
  const [formStructure, setFormStructure] = useState(masterConfig);
  const [loader, setLoader] = useState(true);
  const encryption = new Encryption();

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
              : 
              (
                clientServerEncryptKeys.includes(backup.index) ? 
                  encryption.decrypt(responseObject[backup.index], appData[encryptSaltKey]) : 
                responseObject[backup.index]
              );
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
        : (
          clientServerEncryptKeys.includes(f.id) ? 
            encryption.encrypt(f.value, salt) : 
          f.value
        ),
    }));
    payload = Object.assign({}, ...payload);
    console.log('bbb', payload)
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
            message: intl.formatMessage({ id: 'transactionSavedSuccessfully', defaultMessage: 'transactionSavedSuccessfully' }),
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
          message: intl.formatMessage({ id: 'unableToReachServer', defaultMessage: 'unableToReachServer' }),
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
        <Wizard
          key={1}
          data={formStructure}
          menu={wizardData}
          onMassagePayload={onMassagePayload}
          onReactiveFormSubmit={onReactiveFormSubmit}
        />
      )}
    </div>
  );
}
export default Config;
