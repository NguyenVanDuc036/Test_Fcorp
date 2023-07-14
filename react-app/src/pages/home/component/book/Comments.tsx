import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Comment } from "./Comment";
import {
  BookCommentModel,
  CommentModel,
} from "../../../../models/commentModel";
import {
  postComment,
  replyComment,
  deleteComment,
  updateComment,
} from "../../../../store/book/bookSlide";
import { currentUser } from "../../../../constants/common";
import { FormCommentModel } from "../../../../models/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCommentSchema } from "../../../../validation/book";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "../../../../components/molecules/FormField";
import { InputField } from "../../../../components/molecules/InputField";

type Props = {
  bookId: BookCommentModel["book_id"];
};

const Comments: React.FC<Props> = ({ bookId }) => {
  const bookComment = useSelector((state: RootState) => state.book.comments);
  const dispatch = useDispatch();
  const comments = bookComment.find(
    (book) => book?.book_id == bookId
  )?.comments;

  const defaultValues: FormCommentModel = {
    content: "",
  };

  const resolver = yupResolver(getCommentSchema());
  const formMethods = useForm<any>({ defaultValues, resolver });

  const onSubmit: SubmitHandler<FormCommentModel> = async (formData) => {
    const content: CommentModel = newComment(formData.content);
    dispatch(postComment({ book_id: bookId, content }));
    formMethods.reset();
  };

  function newComment(value: string): CommentModel {
    return {
      id: new Date().getTime(),
      createdAt: moment().format("YYYY/MM/DD HH:mm"),
      user: currentUser,
      content: value,
      children: [],
    };
  }

  function handleReply(parentId: number, replyText: string) {
    const reply: CommentModel = newComment(replyText);
    dispatch(replyComment({ book_id: bookId, parrent_id: parentId, reply }));
  }

  function handleDeleteComment(commentId: number) {
    dispatch(deleteComment({ book_id: bookId, comment_id: commentId }));
  }

  function handleUpdateComment(commentId: number, content: string) {
    dispatch(
      updateComment({ book_id: bookId, comment_id: commentId, content })
    );
  }

  return (
    <>
      <section className="w-full p-10 m-auto bg-white border border-gray-500 rounded-lg shadow dark:bg-gray dark:border-gray-300">
        <p className="text-2xl mb-3 font-bold">Comment</p>
        <div className="max-w-2xl mx-auto px-4">
          <FormField
            className="form w-100"
            methods={formMethods}
            onSubmit={onSubmit}
          >
            <InputField
              groupClass="mb-3 fv-row"
              name="content"
              control={formMethods.control}
              type="textarea"
              placeholder="write a comment ...."
              required
            />
            <button
              type="submit"
              className="bg-transparent mb-7 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Post comment
            </button>
          </FormField>
          <ul>
            {comments?.map((comment: any) => (
              <Comment
                handleUpdateComment={handleUpdateComment}
                key={comment.id}
                handleDeleteComment={handleDeleteComment}
                bookId={bookId}
                comment={comment}
                handleReply={handleReply}
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export { Comments };
