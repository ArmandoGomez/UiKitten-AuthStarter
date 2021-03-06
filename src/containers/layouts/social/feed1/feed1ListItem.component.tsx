import React from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten';
import { Text } from 'react-native-ui-kitten';
import {
  FeedActivityBar,
  Styx,
} from '@src/components/social';
import {
  ImageOverlay,
  textStyle,
} from '@src/components/common';

interface ListDerivedProps {
  index?: number;
}

// @ts-ignore (override `onPress` prop)
interface ComponentProps extends TouchableOpacityProps, ListDerivedProps {
  photo: ImageSourcePropType;
  icon: ImageSourcePropType;
  category: string;
  time: string;
  description: string;
  styx?: string;
  onPress: (index: number) => void;
  onAddPress: (index: number) => void;
  onSharePress: (index: number) => void;
  onLikePress: (index: number) => void;
  onStyxPress: (index: number) => void;
}

export type Feed1ListItemProps = ThemedComponentProps & ComponentProps;

class Feed1ListItemComponent extends React.Component<Feed1ListItemProps> {

  private onPress = () => {
    this.props.onPress(this.props.index);
  };

  private onAddPress = () => {
    this.props.onPress(this.props.index);
  };

  private onSharePress = () => {
    this.props.onPress(this.props.index);
  };

  private onLikePress = () => {
    this.props.onPress(this.props.index);
  };

  private onStyxPress = () => {
    this.props.onStyxPress(this.props.index);
  };

  public render(): React.ReactNode {
    const {
      style,
      themedStyle,
      photo,
      icon,
      category,
      time,
      description,
      styx,
      ...restProps
    } = this.props;

    return (
      <TouchableOpacity
        {...restProps}
        style={[themedStyle.container, style]}
        onPress={this.onPress}>
        <ImageOverlay
          style={themedStyle.photo}
          source={photo}>
          <View style={themedStyle.categoryContainer}>
            <View style={themedStyle.categoryInfoContainer}>
              <Image
                style={themedStyle.categoryIcon}
                source={icon}
              />
              <Text
                style={themedStyle.categoryLabel}
                category='h6'>
                {category}
              </Text>
            </View>
            <Text
              style={themedStyle.timeLabel}>
              {time}
            </Text>
          </View>
        </ImageOverlay>
        <View style={themedStyle.infoContainer}>
          <Styx
            value={styx}
            onPress={this.onStyxPress}
          />
          <Text style={themedStyle.descriptionLabel}>{description}</Text>
        </View>
        <FeedActivityBar
          style={themedStyle.activityContainer}
          onSharePress={this.onSharePress}
          onLikePress={this.onLikePress}
          onAddPress={this.onAddPress}
        />
      </TouchableOpacity>
    );
  }
}

export const Feed1ListItem = withStyles(Feed1ListItemComponent, (theme: ThemeType) => ({
  container: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  activityContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: theme['border-basic-color-2'],
  },
  photo: {
    minHeight: 220,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    tintColor: 'white',
  },
  categoryLabel: {
    marginHorizontal: 8,
    color: 'white',
    ...textStyle.headline,
  },
  timeLabel: {
    color: 'white',
    ...textStyle.subtitle,
  },
  descriptionLabel: {
    marginTop: 16,
    ...textStyle.subtitle,
  },
}));

