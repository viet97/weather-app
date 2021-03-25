import * as React from 'react';
import { Platform, Image, ImageBackground, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';

import BaseCommon from '../BaseCommon';
import { isArray } from 'lodash';
import { Images } from '../../../themes/Images';
import ImageViewer from 'react-native-image-zoom-viewer';
import { TouchablePlatform } from '../../../modules/TouchablePlatform';
import { Colors } from '../../../themes/Colors';
import { getStatusBarHeight } from '../../../utils/DeviceUtil';
import { Text } from '..';

export const TYPE_LEVEL_IMAGE = {
  LOW: FastImage.priority.low,
  NORMAL: FastImage.priority.normal,
  HIGH: FastImage.priority.high,
};

export const TYPE_IMAGE_RESIZE_MODE = {
  CENTER: 'center',
  CONTAIN: 'contain',
  COVER: 'cover',
  REPEAT: 'repeat',
  STRETCH: 'stretch',
};

export const TYPE_IMAGE = {
  HORIZONTAL: 1,
  VERTICAL: 2,
};

const getResizeMode = (name) => {
  switch (name) {
    case TYPE_IMAGE_RESIZE_MODE.COVER:
      return FastImage.resizeMode.cover;
    case TYPE_IMAGE_RESIZE_MODE.STRETCH:
      return FastImage.resizeMode.stretch;
    case TYPE_IMAGE_RESIZE_MODE.CONTAIN:
      return FastImage.resizeMode.contain;
    case TYPE_IMAGE_RESIZE_MODE.CENTER:
      return FastImage.resizeMode.center;
    default:
      return FastImage.resizeMode.cover;
  }
};

const STATE_IMAGE = {
  START_LOAD: 1,
  LOAD_SUCCESS: 2,
  LOAD_ERROR: 3,
};

class CustomImage extends BaseCommon {
  constructor(props) {
    super(props);
    this.displayName = 'CustomImage';
    this.state = {
      stateImage: STATE_IMAGE.START_LOAD,
      isPreviewing: false,
    };
  }

  static ResizeMode = TYPE_IMAGE_RESIZE_MODE;

  renderPreviewImage = () => {
    const { usePreview, previewSource, index } = this.props;
    const { isPreviewing } = this.state;
    if (!usePreview || !previewSource) { return null; }
    let imageUrls = [];
    if (isArray(previewSource)) {
      imageUrls = previewSource.map(it => ({ url: it }));
    } else {
      imageUrls = [{ url: previewSource }];
    }

    return (
      <Modal
        style={{
          flex: 1,
          margin: 0,
        }}
        onBackdropPress={() => this.setStateSafe({ isPreviewing: false })}
        onBackButtonPress={() => this.setStateSafe({ isPreviewing: false })}
        visible={isPreviewing}
        transparent={true}
        backdropOpacity={0.5}
      >
        <ImageViewer
          useNativeDriver
          enablePreload
          onCancel={() => this.setStateSafe({ isPreviewing: false })}
          renderIndicator={(currentIndex, allSize) => {
            if (allSize === 1) { return null; }
            return (
              <Text
                style={{
                  top: getStatusBarHeight() + 16,
                  alignSelf: 'center',
                  color: Colors.white,
                  position: 'absolute',
                }}>{currentIndex} / {allSize}</Text>
            );
          }}
          imageUrls={imageUrls}
          backgroundColor={Colors.background_droppicker}
          index={index}
          renderHeader={() => (
            <TouchablePlatform
              style={{
                position: 'absolute',
                zIndex: 999,
                top: getStatusBarHeight(),
                right: 0,
                padding: 16,
              }}
              onPress={() => this.setStateSafe({ isPreviewing: false })}
            >
              <Image
                source={Images.assets.close.source}
                style={{ width: 36, height: 36 }}
              />
            </TouchablePlatform>
          )}
          enableSwipeDown
        />
      </Modal>
    );
  };

  renderContent() {
    const {
      style,
      source,
      children,
      useFastImage,
      level,
      placeholder,
      placeholderColor,
      placeholderElement,
      resizeMode,
      useBackground,
      useChildren,
      type,
      usePreview,
      ...otherProps
    } = this.props;
    let sourceDefault = '';

    if (!useFastImage || !source.uri || source.uri.indexOf('http') === -1) {
      if (useBackground) {
        return (
          <ImageBackground
            fadeDuration={0}
            style={[style]}
            source={source || sourceDefault}
            resizeMode={resizeMode}
            {...otherProps}
          >
            {useChildren ? children : null}
          </ImageBackground>
        );
      }
      return (
        <Image
          fadeDuration={0}
          style={[style, { resizeMode }]}
          source={source || sourceDefault}
          // resizeMode={resizeMode}
          {...otherProps}
        >
          {children}
        </Image>
      );
    }

    const sourceFast = source
      ? {
        ...source,
        priority: level,
      }
      : {
        ...sourceDefault,
        priority: level,
      };
    const { stateImage } = this.state;

    const styleDefault = {
      backgroundColor: '#00000069',
      flex: 1,
    };

    if (stateImage === STATE_IMAGE.LOAD_ERROR) {
      return (
        <Image
          style={style}
          source={Images.assets.default.source}
          resizeMode={TYPE_IMAGE_RESIZE_MODE.COVER}
        />
      );
    }
    const Wrapper = usePreview ? TouchablePlatform : View;
    return (
      <Wrapper onPress={() => this.setStateSafe({ isPreviewing: true })}>
        {stateImage === STATE_IMAGE.START_LOAD ||
          stateImage === STATE_IMAGE.LOAD_ERROR ? (
          <View style={[style, styleDefault]} />
        ) : null}
        <FastImage
          onLoadStart={() =>
            this.setStateSafe({ stateImage: STATE_IMAGE.START_LOAD })
          }
          onLoad={() => {
            this.setStateSafe({ stateImage: STATE_IMAGE.LOAD_SUCCESS });
          }}
          onError={() =>
            this.setStateSafe({ stateImage: STATE_IMAGE.LOAD_ERROR })
          }
          fadeDuration={0}
          fallback={Platform.OS === 'android'}
          style={stateImage === STATE_IMAGE.LOAD_SUCCESS ? style : null}
          source={sourceFast}
          {...otherProps}
          resizeMode={getResizeMode(resizeMode)}
        >
          {children}
        </FastImage>
        {this.renderPreviewImage()}
      </Wrapper>
    );
  }
}

CustomImage.defaultProps = {
  useFastImage: true,
  previewSource: '',
  usePreview: false,
  level: TYPE_LEVEL_IMAGE.NORMAL,
  resizeMode: TYPE_IMAGE_RESIZE_MODE.CONTAIN,
  source: Images.assets.default.source,
  type: TYPE_IMAGE.VERTICAL,
};

export default CustomImage;
