// comment.component.ts
import { Component, Input } from '@angular/core';
import { TreeComment } from 'app/services/models/reply';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment!: TreeComment; // Nhận dữ liệu comment từ parent

  // Hàm format date
  formatDate(input: string): string {

    const formattedDate = `${input[0]}-${input[1].toString().padStart(2, '0')}-${input[2].toString().padStart(2, '0')} ${input[3].toString().padStart(2, '0')}:${input[4].toString().padStart(2, '0')}`;
    // console.log("hello me" + formattedDate);
    return formattedDate;
  }

  toggleReplyInput(comment: TreeComment): void {
    comment.showReplyInput = !comment.showReplyInput; // Chuyển đổi trạng thái hiển thị của trường nhập phản hồi
  }

  submitReply(comment: TreeComment): void {
    if (comment.content) {
      const newReply: TreeComment = {
        content: comment.replyContent,
        username: 'Current User', // Thay thế bằng tên người dùng hiện tại
        createdAt: new Date().toISOString(),
        parentId: comment.id,
        messageId: comment.messageId,
        replies: [] // Khởi tạo mảng replies
      };

      // Thêm phản hồi vào mảng replies
      if (!comment.replies) {
        comment.replies = []; // Khởi tạo nếu chưa có
      }
      comment.replies.push(newReply);

      // Reset trường nhập
      comment.replyContent = '';
      comment.showReplyInput = false; // Ẩn trường nhập sau khi gửi
    }
  }

  // private generateId(): string {
  //   // Tạo ID ngẫu nhiên cho bình luận mới (có thể thay thế bằng cách khác)
  //   return Math.random().toString(36).substr(2, 9);
  // }
}