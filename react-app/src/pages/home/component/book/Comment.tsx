import React, { useState, useRef } from "react";
import { formatTimeDuration } from "../../../../utils/time";
import { BookCommentModel, CommentModel } from "../../../../models/commentModel";
import { currentUser } from "../../../../constants/common"
import clsx from "clsx";

type Props = {
  comment: CommentModel;
  bookId: BookCommentModel['book_id'];
  handleReply: (commentId: number, replyText: string) => void;
  handleDeleteComment: (commentId: number) => void;
  handleUpdateComment: (commentId: number, content: string) => void;
};

const Comment: React.FC<Props> = ({ comment, bookId, handleReply, handleDeleteComment, handleUpdateComment }) => {
  const [replyText, setReplyText] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);
  const [showEditBox, setShowEditBox] = useState<boolean>(false);
  const inputEl = useRef(null);
  const inputEdit = useRef(null);

  return (
    <li key={comment.id}>
      <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-200">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src="https://picsum.photos/200/300?grayscale"
                alt="Michael Gough"
              />
              {comment.user.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time dateTime="2022-02-08" title="February 8th, 2022">
                {formatTimeDuration(comment.createdAt)}
              </time>
            </p>
          </div>
          {comment.user.id == currentUser.id ? <div className="flex">
            <button
              onClick={() => {
                setShowEditBox(true);
                setShowReplyBox(false);
              }}
              type="button"
              className="items-center mr-3 text-sm text-gray-500 hover:underline dark:text-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDeleteComment(comment.id)
                setShowReplyBox(false);
              }}
              type="button"
              className="items-center text-sm text-gray-500 hover:underline dark:text-red-500"
            >
              Delete
            </button>
          </div> : <></>}
        </footer>
        <p >
          {comment.content}
        </p>
        {!showReplyBox && (
          <div className="flex items-center mt-4 space-x-4">
            <button
              onClick={() => {
                setShowReplyBox(true);
                setShowEditBox(false);
              }}
              type="button"
              className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-600"
            >
              <svg
                aria-hidden="true"
                className="mr-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Reply
            </button>
          </div>
        )}

      </article>
      {showReplyBox && (
        <>
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-200 dark:border-gray-200">
              <textarea
                // rows={1}
                ref={inputEl}
                onChange={(e) => {
                  setReplyText(e.target.value);
                }}
                className="px-0 w-full text-lg text-gray-900 border-0 focus:ring-0 focus:outline-none dark:placeholder-gray-400 dark:bg-gray-200"
                placeholder="Write a comment..."
              />

            </div>
            <button
              type="button"
              disabled={!replyText.trim() ? true : false}
              className={clsx(replyText.trim() ? 'cursor-pointer' : 'cursor-not-allowed', 'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-5 mb-5')}
              onClick={() => {
                handleReply(comment.id, replyText);
                setShowReplyBox(false);
                setReplyText("");
              }}
            >
              Reply
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-gray-200 font-semibold py-2 px-4 border border-gray-100 rounded shadow mr-5 mb-5"
              type="button"
              onClick={() => {
                setShowReplyBox(false);
                setReplyText("");
              }}
            >
              cancel
            </button>
          </form>
        </>
      )}
      {showEditBox && (
        <>
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-200 dark:border-gray-200">
              <textarea
                ref={inputEdit}
                onChange={(e) => {
                  setEditText(e.target.value);
                }}
                className="px-0 w-full text-lg text-gray-900 border-0 focus:ring-0 focus:outline-none dark:placeholder-gray-400 dark:bg-gray-200"
                placeholder="Write a comment..."
              />

            </div>
            <button
              type="button"
              disabled={!editText.trim() ? true : false}
              className={clsx(editText.trim() ? 'cursor-pointer' : 'cursor-not-allowed', 'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-5 mb-5')}
              onClick={() => {
                handleUpdateComment(comment.id, editText);
                setShowEditBox(false);
                setEditText("");
              }}
            >
              Update
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-gray-200 font-semibold py-2 px-4 border border-gray-100 rounded shadow mr-5 mb-5"
              type="button"
              onClick={() => {
                setShowEditBox(false);
                setEditText("");
              }}
            >
              cancel
            </button>
          </form>
        </>
      )}
      {comment.children.length > 0 && (
        <ul className="ml-12 space-y-4">
          {comment.children.map((childComment) => (
            <Comment
              key={childComment.id}
              comment={childComment}
              handleReply={handleReply}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment}
              bookId={bookId}
            />
          ))}
        </ul>
      )}
    </li>
  );
}


export { Comment };