import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BookCommentModel, CommentModel } from "../../models/commentModel";
import comments from "../../mocks/data/comments.json"
export interface IPostComment {
  book_id: BookCommentModel["book_id"];
  content: CommentModel;
}

interface IDeleteComment {
  book_id: BookCommentModel["book_id"];
  comment_id: CommentModel["id"];
}

interface IUpdateComment {
  book_id: BookCommentModel["book_id"];
  comment_id: CommentModel["id"];
  content: string;
}

interface IReplyComment {
  book_id: BookCommentModel["book_id"];
  parrent_id: CommentModel["id"];
  reply: CommentModel;
}

const initialState: { comments: any[] } = {
  comments
};

type BookActionType = "add" | "update" | "delete";

interface ICommentAction {
  comments: CommentModel[];
  commentId: CommentModel["id"];
  type: BookActionType;
  contentModel?: CommentModel;
  content: string;
}

function handleCommentAction({
  comments,
  commentId,
  type,
  contentModel,
  content,
}: ICommentAction) {
  comments.forEach((comment, index) => {
    if (comment.id === commentId) {
      switch (type) {
        case "add":
          contentModel && comment.children.unshift(contentModel);
          break;
        case "update":
          comment.content = content;
          break;
        case "delete":
          comments.splice(index, 1);
          break;
        default:
          break;
      }
    }
  });
  comments.forEach((comment) => {
    handleCommentAction({
      comments: comment.children,
      commentId,
      type,
      contentModel,
      content,
    });
  });
}

function findCommentByBookId(
  comments: BookCommentModel[],
  bookId: string
): number {
  return comments.findIndex((book) => book.book_id === bookId);
}

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    postComment: (state, action: PayloadAction<IPostComment>) => {
      const { book_id, content } = action.payload;
      const bookDetailIndex = findCommentByBookId(state.comments, book_id);
      if (bookDetailIndex !== -1) {
        state.comments[bookDetailIndex].comments.unshift(content);
      }

      state.comments.push({
        id: new Date().getTime(),
        book_id: action.payload.book_id,
        comments: [content],
      });
    },
    replyComment: (state, action: PayloadAction<IReplyComment>) => {
      const { book_id, reply, parrent_id } = action.payload;
      const bookDetailIndex = findCommentByBookId(state.comments, book_id);
      handleCommentAction({
        comments: state.comments[bookDetailIndex].comments,
        commentId: parrent_id!,
        type: "add",
        contentModel: reply,
        content: "",
      });
    },
    updateComment: (state, action: PayloadAction<IUpdateComment>) => {
      const { book_id, comment_id, content } = action.payload;
      const bookDetailIndex = findCommentByBookId(state.comments, book_id);
      handleCommentAction({
        comments: state.comments[bookDetailIndex].comments,
        commentId: comment_id!,
        type: "update",
        content,
      });
    },
    deleteComment: (state, action: PayloadAction<IDeleteComment>) => {
      const { book_id, comment_id } = action.payload;
      const bookDetailIndex = findCommentByBookId(state.comments, book_id);
      handleCommentAction({
        comments: state.comments[bookDetailIndex].comments,
        commentId: comment_id!,
        type: "delete",
        content: "",
      });
    },
  },
});

export const { postComment, updateComment, deleteComment, replyComment } =
  bookSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default bookSlice.reducer;
