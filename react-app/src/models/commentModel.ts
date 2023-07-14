import { UserModel } from "./userModel";

export interface BookCommentModel {
    id: number;
    book_id: string;
    comments : CommentModel[]
}

export interface CommentModel {
    id: number;
    user: UserModel;
    content: string;
    createdAt: string;
    children: CommentModel[];
}