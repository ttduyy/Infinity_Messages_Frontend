import { CommentDto } from './comment-dto';

export interface TreeComment extends CommentDto {
    replies?: TreeComment[]; // Thêm mảng chứa các reply
    showReplyInput?: boolean;
    replyContent?: string;
}

export function buildCommentTree(comments: CommentDto[]): TreeComment[] {
    const commentMap = new Map<string, TreeComment>();

    // Tạo bản đồ các comment theo id
    comments.forEach(comment => {
        commentMap.set(comment.id ?? '', { ...comment, replies: [] });
    });

    const rootComments: TreeComment[] = [];

    // Gắn các reply vào comment cha
    comments.forEach(comment => {
        if (comment.parentId) {
            const parentComment = commentMap.get(comment.parentId);
            parentComment?.replies?.push(commentMap.get(comment.id ?? '')!);
        } else {
            // Nếu không có parentId, là comment gốc
            rootComments.push(commentMap.get(comment.id ?? '')!);
        }
    });

    return rootComments;
}
