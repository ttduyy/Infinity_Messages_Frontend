import { Component, Input, OnInit } from '@angular/core';
import { MessageDto } from 'app/services/models';
import { CommentDto } from 'app/services/models';
import { buildCommentTree, TreeComment } from 'app/services/models/reply';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input() post!: MessageDto; // Dữ liệu bài post
    @Input() posts: MessageDto[] = []; // Dữ liệu post
    @Input() comments: CommentDto[] = []; // Dữ liệu comment

    treeComments: TreeComment[] = []; // Dữ liệu dạng cây
    newCommentContent: { [key: string]: string } = {}; // Lưu nội dung bình luận cho từng post

    ngOnInit(): void {
        // Xây dựng dữ liệu comment dạng cây cho bài viết cụ thể
        this.treeComments = buildCommentTree(this.comments.filter(comment => comment.messageId === this.post.id));
        this.newCommentContent[this.post.id ?? ''] = ''; // Khởi tạo nội dung bình luận cho post
    }

    // Hàm format date
    formatDate(input: string): string {

        const formattedDate = `${input[0]}-${input[1].toString().padStart(2, '0')}-${input[2].toString().padStart(2, '0')} ${input[3].toString().padStart(2, '0')}:${input[4].toString().padStart(2, '0')}`;
        // console.log("hello me" + formattedDate);
        return formattedDate;
    }

    // Hàm gửi bình luận mới
    submitComment(post: MessageDto): void {
        const content = this.newCommentContent[post.id ?? ''];
        if (content && content.trim()) {
            const newComment: CommentDto = {
                // id: this.generateId(), // Tạo ID cho bình luận mới
                content: content,
                username: 'Current User', // Thay thế bằng tên người dùng hiện tại
                createdAt: new Date().toISOString(),
                messageId: post.id ?? '' // Gán messageId cho bình luận
            };

            // Thêm bình luận mới vào mảng comments
            this.comments.push(newComment);

            // Cập nhật lại treeComments
            this.treeComments = buildCommentTree(this.comments.filter(comment => comment.messageId === this.post.id));

            // Reset trường nhập cho bài viết hiện tại
            this.newCommentContent[post.id ?? ''] = '';
        }
    }
}

    // private generateId(): string {
    //     // Tạo ID ngẫu nhiên cho bình luận mới (có thể thay thế bằng cách khác)
    //     return Math.random().toString(36).substr(2, 9);
    // }
