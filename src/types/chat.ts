export interface ChatUser {
  username: string;
  status: 'online' | 'offline' | 'away'; // یا string اگر نمی‌دانید دقیقاً چه مقدارهایی می‌آید
  image: string;
  avatar?: string;    // اگر در JSON دو فیلد مشابه دارید یکی را حذف یا هماهنگ کنید
  lastSeen?: string;
}