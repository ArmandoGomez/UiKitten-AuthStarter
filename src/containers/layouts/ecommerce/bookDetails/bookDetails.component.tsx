import React from 'react';
import { View } from 'react-native';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from 'react-native-ui-kitten';
import {
  Button,
  Input,
  Text,
} from 'react-native-ui-kitten';
import { BookHeader } from '@src/components/ecommerce';
import { CommentsList1 } from '@src/components/articles';
import {
  Book,
  Comment,
} from '@src/core/model';
import {
  ContainerView,
  textStyle,
} from '@src/components/common';

interface ComponentProps {
  book: Book;
  comments: Comment[];
  currentCommentText: string;
  onBuyBook: () => void;
  onCommentSubmit: () => void;
  onCommentTextChange: (text: string) => void;
  onCommentLikePress: (index: number) => void;
  onCommentMorePress: (index: number) => void;
  onCommentReplyMorePress: (index: number) => void;
}

export type BookDetailsProps = ThemedComponentProps & ComponentProps;

class BookDetailsComponent extends React.Component<BookDetailsProps> {

  private onBuyBook = (): void => {
    this.props.onBuyBook();
  };

  private onCommentLikePress = (index: number) => {
    this.props.onCommentLikePress(index);
  };

  private onCommentMorePress = (index: number) => {
    this.props.onCommentMorePress(index);
  };

  private onCommentReplyMorePress = (index: number) => {
    this.props.onCommentReplyMorePress(index);
  };

  private onCommentTextChange = (text: string): void => {
    this.props.onCommentTextChange(text);
  };

  private handleTextSubmit = () => {
    this.props.onCommentSubmit();
  };

  public render(): React.ReactNode {
    const { themedStyle, book, comments, currentCommentText } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
        <BookHeader
          style={themedStyle.bookHeader}
          image={book.preview.imageSource}
          title={book.name}
          author={book.author}
          categories={book.categories}
          rating={book.rating}
          price={`${book.currency} ${book.price}`}
        />
        <Button
          style={themedStyle.buyButton}
          textStyle={textStyle.button}
          onPress={this.onBuyBook}>
          BUY BOOK
        </Button>
        <View style={themedStyle.descriptionContainer}>
          <Text
            style={[themedStyle.sectionLabel, themedStyle.aboutLabel]}
            category='s1'>
            About Book
          </Text>
          <Text
            style={themedStyle.descriptionLabel}
            appearance='hint'>
            {book.description}
          </Text>
        </View>
        <View style={themedStyle.commentsContainer}>
          <View style={themedStyle.inputContainer}>
            <Text
              style={[themedStyle.sectionLabel, themedStyle.commentsLabel]}
              category='s1'>
              Comments
            </Text>
            <Input
              textStyle={textStyle.paragraph}
              placeholder='Write your comment'
              value={currentCommentText}
              onChangeText={this.onCommentTextChange}
              onSubmitEditing={this.handleTextSubmit}
            />
          </View>
          <CommentsList1
            data={comments}
            onLikePress={this.onCommentLikePress}
            onMorePress={this.onCommentMorePress}
            onReplyMorePress={this.onCommentReplyMorePress}
          />
        </View>
      </ContainerView>
    );
  }
}

export const BookDetails = withStyles(BookDetailsComponent, (theme: ThemeType) => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
  },
  bookHeader: {
    paddingHorizontal: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: theme['background-basic-color-2'],
  },
  commentsContainer: {
    paddingVertical: 24,
    backgroundColor: theme['background-basic-color-2'],
  },
  inputContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionLabel: textStyle.subtitle,
  aboutLabel: {
    marginBottom: 16,
  },
  commentsLabel: {
    marginBottom: 8,
  },
  descriptionLabel: textStyle.paragraph,
  buyButton: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
}));
