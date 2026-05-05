# E-Typing Fake Bot (Chrome Extension)

E-Typing Fake Bot là một tiện ích mở rộng dành cho trình duyệt Chrome giúp bạn vượt qua các bài kiểm tra gõ phím trên trang web e-typing.ne.jp. Công cụ này hoạt động theo cơ chế "Fake Typing": Bạn có thể nhấn bất kỳ phím nào trên bàn phím, nhưng kết quả nhập vào luôn là ký tự đúng mà hệ thống yêu cầu.

## Tính năng nổi bật

- **Chế độ Silent (Im lặng):** Hoạt động ngầm hoàn toàn, không có thông báo, alert hay thay đổi giao diện trang web.  
- **Bật/Tắt nhanh:** Sử dụng phím `F8` để kích hoạt hoặc hủy kích hoạt Bot ngay lập tức.  
- **Deep Logic:** Giả lập sự kiện bàn phím ở tầng sâu (`keydown`, `keypress`, `keyup`) với mã phím (`keyCode`, `which`, `charCode`) chính xác, giúp vượt qua engine bắt phím của E-typing.  
- **Hỗ trợ Iframe:** Tự động nhận diện và hoạt động chính xác ngay cả khi bài thi nằm trong các khung hình con (iframes).  


## Hướng dẫn cài đặt

Để cài đặt Bot này vào trình duyệt Chrome, hãy làm theo các bước sau:

1. **Tải mã nguồn:** Tải toàn bộ thư mục dự án này về máy tính của bạn.
   clone về hoặc đang để tag v1 với phiên bản không romaji on còn phiên bản mới đang release là romaji off
   Thằng nào về gặp bug thì tự thêm vào map rồi kéo pr
3. **Mở trình quản lý Extension:** Truy cập địa chỉ `chrome://extensions/` trên trình duyệt Chrome.  
4. **Bật Developer Mode:** Gạt công tắc **Developer mode** ở góc trên cùng bên phải màn hình.  
5. **Nạp tiện ích:**
   - Nhấn vào nút **Load unpacked** (Tải tiện ích đã giải nén).  
   - Chọn thư mục `E-Typing-Fake-Bot` mà bạn đã tải về ở bước 1.  
6. **Xác nhận:** Extension mang tên **"E-Typing Silent Bot"** sẽ xuất hiện trong danh sách.  

## Cách sử dụng

1. Truy cập trang web **E-typing Roma Check**.  
2. Nhấn nút bắt đầu bài thi (thường là nút màu cam **今すぐチェック**). Chọn スタート　và space để mở màn hình gõ.
3. Khi màn hình gõ chữ xuất hiện (hiển thị câu cần gõ):
   - Nhấn phím `F8` trên bàn phím để bật Bot.  
   - Click chuột vào vùng gõ phím một cái để đảm bảo tiêu điểm (focus) nằm đúng chỗ.  
4. **Bắt đầu gõ:**  
   - Bây giờ bạn có thể gõ bất kỳ phím nào (ví dụ nhấn liên tục phím `J`), hệ thống sẽ tự động hiện ra chữ đúng theo bài thi.  
5. **Tắt Bot:**  
   - Nhấn `F8` một lần nữa nếu bạn muốn quay lại gõ thật bằng tay.  

## Lưu ý quan trọng (Đọc kỹ)

- **TẮT BỘ GÕ TIẾNG VIỆT:**  
  Bạn PHẢI chuyển Unikey/EVKey sang chế độ gõ Tiếng Anh (**English - chữ E màu xanh**). Nếu để chế độ Tiếng Việt (V), phím bạn bấm sẽ bị bộ gõ can thiệp làm sai lệch mã phím trước khi Bot xử lý, dẫn đến Bot không hoạt động hoặc gõ sai.  

- **Không spam quá nhanh:**  
  Để kết quả trông giống người thật nhất, hãy gõ với tốc độ vừa phải của bạn và không sợ khi bấm sai. Spam quá nhanh có thể khiến hệ thống nghi ngờ hoặc bài thi bị lỗi kết thúc sớm. đôi khi tắt bằng cách bấm f8 để gõ sai 1 2 kí tự nhé =))))  
  khuyến cáo cứ tầm 26x là A rồi, nhiều nó lộ


- **Focus:**  
  Luôn đảm bảo bạn đã click vào vùng cửa sổ gõ phím trước khi nhấn `F8` và bắt đầu gõ. 
  Cố gắng sai và từ trước khi nhấn `F8` và tắt lúc cần thiết `=))`, lời khuyên gõ chậm thôi. 

##  Giấy phép

Dự án được cung cấp cho mục đích học tập và nghiên cứu về cách Javascript can thiệp vào các sự kiện trình duyệt. Không khuyến khích sử dụng để gian lận trong các kỳ thi chính thức. 
