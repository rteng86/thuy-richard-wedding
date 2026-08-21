/**
 * i18n.js
 * ---------------------------------------------------------------------------
 * Language switching for the site. Supports English (default), Mandarin
 * (Simplified), and Vietnamese.
 *
 * IMPORTANT — translation quality: the zh/vi strings below were drafted
 * by AI, not reviewed by a native speaker of each language. They should read
 * naturally, but before guests rely on them, it's worth having a native
 * speaker skim each language once — especially the FAQ answers, which are
 * the longest and most detail-heavy content on the site.
 *
 * HOW IT WORKS
 * - UI_STRINGS holds every static string in the site's UI (nav, buttons,
 *   form labels, callouts, etc.), keyed by a short id, one value per
 *   language. Elements tagged data-i18n="some.key" in the HTML get their
 *   text (or innerHTML, for a few keys that contain markup) set from here.
 * - CONTENT_TRANSLATIONS holds translated overrides for the big data-driven
 *   structures in content.js (FAQs, itinerary, packing list) keyed by the
 *   same `id` fields already on those objects. content.js itself is never
 *   translated or duplicated — English stays the single source of truth
 *   there, and these are just per-language overlays main.js applies when
 *   rendering.
 * - The selected language is stored in localStorage so it persists across
 *   pages and visits. Must load AFTER content.js and BEFORE main.js.
 *
 * TO ADD OR EDIT A TRANSLATION: find the key below and edit the value for
 * that language. To add a brand-new static string elsewhere on the site,
 * add a data-i18n="your.key" attribute to the element and a new entry here.
 * ---------------------------------------------------------------------------
 */

var SUPPORTED_LANGUAGES = [
  { code: "en", flag: "🇬🇧", label: "English", htmlLang: "en" },
  { code: "zh", flag: "🇨🇳", label: "中文", htmlLang: "zh-CN" },
  { code: "vi", flag: "🇻🇳", label: "Tiếng Việt", htmlLang: "vi" },
];

var LOCALE_MAP = { en: "en-US", zh: "zh-CN", vi: "vi-VN" };

/* =============================================================================
   UI_STRINGS — every static string in the site chrome/forms/callouts.
   ========================================================================== */
var UI_STRINGS = {
  "skip-link": { en: "Skip to content", zh: "跳到主要内容", vi: "Bỏ qua đến nội dung chính" },
  "nav.toggleAria": { en: "Toggle navigation menu", zh: "切换导航菜单", vi: "Bật/tắt menu điều hướng" },
  "nav.home": { en: "Home", zh: "首页", vi: "Trang chủ" },
  "nav.travel": { en: "Travel", zh: "旅行", vi: "Du lịch" },
  "nav.schedule": { en: "Schedule", zh: "日程", vi: "Lịch trình" },
  "nav.guide": { en: "Guide", zh: "指南", vi: "Cẩm nang" },

  "langswitch.aria": { en: "Change language", zh: "切换语言", vi: "Đổi ngôn ngữ" },

  "modal.title": { en: "Choose your language", zh: "选择语言", vi: "Chọn ngôn ngữ của bạn" },
  "modal.subtitle": { en: "You can change this anytime from the menu at the top of the page.", zh: "您可以随时在页面顶部的菜单中更改语言。", vi: "Bạn có thể thay đổi ngôn ngữ bất cứ lúc nào từ menu ở đầu trang." },
  "modal.continueEnglish": { en: "Continue in English", zh: "继续使用英文", vi: "Tiếp tục bằng tiếng Anh" },

  "footer.questions": { en: "Questions?", zh: "有疑问？", vi: "Có thắc mắc?" },
  "common.whatsappGroupNote": { en: "our WhatsApp group", zh: "我们的WhatsApp群组", vi: "nhóm WhatsApp của chúng tôi" },
  "common.contactLine": {
    en: "Text {name} at {phone} or join {link}.",
    zh: "发短信给{name}（{phone}），或加入{link}。",
    vi: "Nhắn tin cho {name} theo số {phone}, hoặc tham gia {link}.",
  },
  "common.contactLineLower": {
    en: "text {name} at {phone} or join {link}.",
    zh: "发短信给{name}（{phone}），或加入{link}。",
    vi: "nhắn tin cho {name} theo số {phone}, hoặc tham gia {link}.",
  },
  "common.stillHaveQuestion": { en: "Still have a question?", zh: "还有其他问题？", vi: "Bạn vẫn còn thắc mắc?" },
  "common.happyToHelp": { en: "We're happy to help —", zh: "我们很乐意为您解答——", vi: "Chúng tôi rất sẵn lòng giúp đỡ —" },
  "common.scanToJoin": { en: "Scan to join", zh: "扫码加入", vi: "Quét mã để tham gia" },
  "common.whatsappAria": { en: "Open the WhatsApp group invite", zh: "打开WhatsApp群组邀请", vi: "Mở lời mời nhóm WhatsApp" },
  "common.backToTopAria": { en: "Back to top", zh: "返回顶部", vi: "Lên đầu trang" },
  "common.noResultsPrefix": { en: "No questions match your search. Try a different word, or", zh: "没有找到匹配的问题。请尝试其他关键词，或", vi: "Không có câu hỏi nào khớp với tìm kiếm của bạn. Hãy thử từ khóa khác, hoặc" },
  "common.backToTopLink": { en: "Back to top ↑", zh: "返回顶部 ↑", vi: "Lên đầu trang ↑" },
  "common.or": { en: "or", zh: "或", vi: "hoặc" },

  /* -------------------------- Home / index.html -------------------------- */
  "index.hero.anchor": {
    en: "Come celebrate our union around the chaos of Saigon, then spend the rest of the time relaxing at the resort.",
    zh: "来西贡的热闹喧嚣中，与我们共同见证这段姻缘，再于度假村中尽情放松，度过余下的时光。",
    vi: "Hãy đến cùng chúng tôi ăn mừng ngày trọng đại giữa nhịp sống sôi động của Sài Gòn, rồi dành phần thời gian còn lại để thư giãn tại khu nghỉ dưỡng.",
  },
  "index.rsvpBtn": { en: "RSVP", zh: "回复邀请", vi: "Xác nhận tham dự" },
  "index.travelInfoBtn": { en: "Travel info", zh: "旅行信息", vi: "Thông tin du lịch" },
  "index.countdownHidden": { en: "Counting down to arrival day", zh: "倒计时至抵达日", vi: "Đếm ngược đến ngày đến" },
  "index.countdownArrived": { en: "We're here!", zh: "我们到啦！", vi: "Chúng tôi đã đến rồi!" },
  "index.countdownDays": { en: "Days", zh: "天", vi: "Ngày" },
  "index.countdownHours": { en: "Hours", zh: "小时", vi: "Giờ" },
  "index.countdownMinutes": { en: "Minutes", zh: "分钟", vi: "Phút" },
  "index.countdownSeconds": { en: "Seconds", zh: "秒", vi: "Giây" },

  "index.eyebrowShort": { en: "The short version", zh: "简明版", vi: "Tóm tắt nhanh" },
  "index.shortHeading": { en: "Everything you need to know, fast", zh: "快速了解所有要点", vi: "Mọi thứ bạn cần biết, thật nhanh" },
  "index.shortSub": { en: "For guests who want the headline before the details. Click on each for more details.", zh: "如果您想先看重点再看细节——点击每张卡片查看详情。", vi: "Dành cho khách muốn nắm ý chính trước khi đọc chi tiết. Nhấn vào từng mục để xem thêm." },

  "index.cardWhenTitle": { en: "When", zh: "时间", vi: "Khi nào" },
  "index.cardWhenDesc": { en: "{dateRange}. Ceremony is Day 2 — full itinerary on the schedule page.", zh: "{dateRange}。婚礼仪式在第2天——完整行程请见日程页面。", vi: "{dateRange}. Lễ cưới diễn ra vào Ngày 2 — xem lịch trình đầy đủ tại trang lịch trình." },
  "index.cardWhenLink": { en: "See the schedule →", zh: "查看日程 →", vi: "Xem lịch trình →" },
  "index.cardWhereTitle": { en: "Where", zh: "地点", vi: "Ở đâu" },
  "index.cardWhereDesc": { en: "Ho Tram, Vietnam — fly into Saigon (SGN), then it's about 2.5–3 hours to the coast.", zh: "越南头顿（Ho Tram）——先飞抵西贡（SGN），再驱车约2.5–3小时到海边。", vi: "Hồ Tràm, Việt Nam — bay đến Sài Gòn (SGN), sau đó di chuyển khoảng 2,5–3 giờ ra biển." },
  "index.cardWhereLink": { en: "Travel & getting there →", zh: "旅行与交通 →", vi: "Du lịch & cách di chuyển →" },
  "index.cardHowLongTitle": { en: "How long to stay", zh: "建议停留时间", vi: "Nên ở lại bao lâu" },
  "index.cardHowLongDesc": { en: "The core weekend is four days. We'd love it if you came a few days early to see Saigon first.", zh: "核心活动为期四天。欢迎您提前几天抵达，先逛逛西贡。", vi: "Sự kiện chính kéo dài bốn ngày. Chúng tôi rất mong bạn đến sớm vài ngày để khám phá Sài Gòn trước." },
  "index.cardHowLongLink": { en: "Suggested arrival plan →", zh: "建议行程安排 →", vi: "Gợi ý kế hoạch đến sớm →" },
  "index.cardWearTitle": { en: "What to wear", zh: "穿着建议", vi: "Nên mặc gì" },
  "index.cardWearDesc": { en: "Beach-wedding attire: light fabrics, nothing heavy. No blazer or suit required — business casual is fine.", zh: "海滩婚礼着装：轻薄面料为宜，避免厚重衣物。无需西装外套或正装，商务休闲装即可。", vi: "Trang phục dự tiệc cưới bãi biển: vải mỏng nhẹ, tránh đồ dày. Không cần vest hay áo blazer; trang phục công sở thoải mái (business casual) là được." },
  "index.cardWearLink": { en: "Full packing list →", zh: "完整打包清单 →", vi: "Danh sách hành lý đầy đủ →" },

  "rsvp.eyebrow": { en: "The main event", zh: "重头戏", vi: "Sự kiện chính" },
  "rsvp.heading": { en: "RSVP", zh: "回复邀请", vi: "Xác Nhận Tham Dự" },
  "rsvp.deadlinePrefix": { en: "Please respond by", zh: "请于", vi: "Vui lòng phản hồi trước ngày" },
  "rsvp.deadlineSuffix": { en: "so we can finalize headcounts with the resort.", zh: "前回复，以便我们向度假村确认最终人数。", vi: "để chúng tôi chốt số lượng khách với khu nghỉ dưỡng." },
  "rsvp.firstName": { en: "First name", zh: "名字", vi: "Tên" },
  "rsvp.lastName": { en: "Last name", zh: "姓氏", vi: "Họ" },
  "rsvp.email": { en: "Email", zh: "电子邮箱", vi: "Email" },
  "rsvp.phone": { en: "Phone number", zh: "电话号码", vi: "Số điện thoại" },
  "rsvp.attendingLegend": { en: "Will you be attending?", zh: "您是否会出席？", vi: "Bạn có tham dự không?" },
  "rsvp.attendingYes": { en: "Joyfully, yes", zh: "十分乐意，我会出席", vi: "Chắc chắn rồi, tôi sẽ tham dự" },
  "rsvp.attendingNo": { en: "Sadly, can't make it", zh: "很遗憾，无法出席", vi: "Rất tiếc, tôi không thể tham dự" },
  "rsvp.err.attending": { en: "Please let us know if you're attending.", zh: "请告知我们您是否会出席。", vi: "Vui lòng cho chúng tôi biết bạn có tham dự không." },

  "rsvp.bringingLegend": { en: "Bringing anyone with you?", zh: "是否有同行人员？", vi: "Bạn có đi cùng ai không?" },
  "rsvp.bringingHint": { en: "Kids are more than welcome! Add additional guests in your party — each one gets their own dietary preference.", zh: "非常欢迎携带小朋友！请在此添加同行人员——每位都可单独填写饮食需求。", vi: "Rất hoan nghênh các bé đi cùng! Hãy thêm những người đi cùng bạn — mỗi người có thể ghi riêng nhu cầu ăn uống." },
  "rsvp.addGuest": { en: "+ Add a guest", zh: "+ 添加同行人员", vi: "+ Thêm người đi cùng" },
  "rsvp.guestHeading": { en: "Guest {n}", zh: "同行人员 {n}", vi: "Khách {n}" },
  "rsvp.remove": { en: "Remove", zh: "移除", vi: "Xóa" },
  "rsvp.removeAria": { en: "Remove guest {n}", zh: "移除同行人员 {n}", vi: "Xóa khách {n}" },
  "rsvp.ageLabel": { en: "Age, if a child", zh: "年龄（如为儿童）", vi: "Tuổi (nếu là trẻ em)" },
  "rsvp.ageBlank": { en: "Leave blank if an adult", zh: "成人请留空", vi: "Để trống nếu là người lớn" },
  "rsvp.dietaryNeedsLabel": { en: "Dietary needs (optional)", zh: "饮食需求（选填）", vi: "Nhu cầu ăn uống (không bắt buộc)" },
  "rsvp.dietaryNeedsPlaceholder": { en: "e.g. vegetarian, nut allergy", zh: "例如：素食、坚果过敏", vi: "vd: ăn chay, dị ứng đậu phộng" },
  "rsvp.err.guestFirstName": { en: "First name is required for this guest.", zh: "请填写该同行人员的名字。", vi: "Vui lòng nhập tên của khách này." },
  "rsvp.err.guestLastName": { en: "Last name is required for this guest.", zh: "请填写该同行人员的姓氏。", vi: "Vui lòng nhập họ của khách này." },

  "rsvp.vungTauLegend": { en: "Vung Tau day trip (July 2)", zh: "头顿一日游（7月2日）", vi: "Chuyến đi Vũng Tàu trong ngày (2/7)" },
  "rsvp.vungTauHint": { en: "Both are great options — this is a free day, not an obligation. Check a box for each person so we can size the shuttle.", zh: "两个选项都很好——这是自由活动日，并非强制安排。请为每位同行人员勾选一项，以便我们安排合适的班车。", vi: "Cả hai lựa chọn đều tuyệt — đây là ngày tự do, không bắt buộc. Vui lòng chọn cho từng người để chúng tôi sắp xếp xe đưa đón phù hợp." },
  "rsvp.you": { en: "You", zh: "您", vi: "Bạn" },
  "rsvp.joinShuttle": { en: "Join shuttle", zh: "参加班车", vi: "Đi xe đưa đón" },
  "rsvp.stayAtResort": { en: "Stay at resort", zh: "留在度假村", vi: "Ở lại khu nghỉ dưỡng" },
  "rsvp.notSure": { en: "Not sure", zh: "还不确定", vi: "Chưa chắc chắn" },

  "rsvp.dietaryLegend": { en: "Dietary restrictions (for you)", zh: "饮食限制（您本人）", vi: "Hạn chế ăn uống (của bạn)" },
  "rsvp.vegetarian": { en: "Vegetarian", zh: "素食", vi: "Ăn chay" },
  "rsvp.vegan": { en: "Vegan", zh: "严格素食", vi: "Thuần chay" },
  "rsvp.glutenSensitivity": { en: "Gluten sensitivity", zh: "麸质敏感", vi: "Nhạy cảm với gluten" },
  "rsvp.nutAllergy": { en: "Nut allergy", zh: "坚果过敏", vi: "Dị ứng đậu phộng/hạt" },
  "rsvp.shellfishAllergy": { en: "Shellfish allergy", zh: "海鲜过敏", vi: "Dị ứng hải sản có vỏ" },
  "rsvp.anythingElseKnow": { en: "Anything else we should know?", zh: "还有其他需要告知我们的吗？", vi: "Có điều gì khác chúng tôi nên biết không?" },
  "rsvp.dietaryOtherPlaceholder": { en: "e.g. severe allergy details", zh: "例如：严重过敏详情", vi: "vd: chi tiết về dị ứng nặng" },

  "rsvp.mobilityLabel": { en: "Mobility or accessibility needs", zh: "行动不便或无障碍需求", vi: "Nhu cầu về khả năng di chuyển hoặc tiếp cận" },
  "rsvp.mobilityPlaceholder": { en: "Let us know how we can make things easier for you — optional.", zh: "请告诉我们如何能让您更方便——选填。", vi: "Hãy cho chúng tôi biết cách giúp bạn thuận tiện hơn — không bắt buộc." },

  "rsvp.nightsLegend": { en: "Which nights will you be at the resort?", zh: "您将在度假村入住哪几晚？", vi: "Bạn sẽ ở khu nghỉ dưỡng những đêm nào?" },
  "rsvp.june30": { en: "June 30", zh: "6月30日", vi: "30 tháng 6" },
  "rsvp.july1": { en: "July 1 (wedding day)", zh: "7月1日（婚礼当天）", vi: "1 tháng 7 (ngày cưới)" },
  "rsvp.july2": { en: "July 2", zh: "7月2日", vi: "2 tháng 7" },
  "rsvp.july3": { en: "July 3", zh: "7月3日", vi: "3 tháng 7" },

  "rsvp.noteLabel": { en: "Anything else you'd like to tell us?", zh: "还有其他想告诉我们的吗？", vi: "Bạn có điều gì khác muốn chia sẻ với chúng tôi không?" },
  "rsvp.notePlaceholder": { en: "Optional note to us", zh: "给我们的留言（选填）", vi: "Lời nhắn (không bắt buộc)" },

  "rsvp.submit": { en: "Submit RSVP", zh: "提交回复", vi: "Gửi Xác Nhận" },
  "rsvp.sending": { en: "Sending...", zh: "发送中……", vi: "Đang gửi..." },
  "rsvp.sendingStatus": { en: "Sending your RSVP...", zh: "正在发送您的回复……", vi: "Đang gửi xác nhận của bạn..." },
  "rsvp.fixHighlighted": { en: "Please fix the highlighted fields.", zh: "请修正标记出的字段。", vi: "Vui lòng sửa các trường được đánh dấu." },

  "rsvp.err.firstName": { en: "First name is required.", zh: "请填写名字。", vi: "Vui lòng nhập tên." },
  "rsvp.err.lastName": { en: "Last name is required.", zh: "请填写姓氏。", vi: "Vui lòng nhập họ." },
  "rsvp.err.email": { en: "Email is required.", zh: "请填写电子邮箱。", vi: "Vui lòng nhập email." },
  "rsvp.err.emailInvalid": { en: "Enter a valid email address.", zh: "请输入有效的电子邮箱地址。", vi: "Vui lòng nhập địa chỉ email hợp lệ." },
  "rsvp.err.phone": { en: "Phone number is required.", zh: "请填写电话号码。", vi: "Vui lòng nhập số điện thoại." },
  "rsvp.err.phoneInvalid": { en: "Enter a valid phone number.", zh: "请输入有效的电话号码。", vi: "Vui lòng nhập số điện thoại hợp lệ." },

  "rsvp.successThanks": { en: "Thank you, {name}!", zh: "谢谢您，{name}！", vi: "Cảm ơn bạn, {name}!" },
  "rsvp.successThanksFallback": { en: "friend", zh: "朋友", vi: "bạn" },
  "rsvp.successBody": { en: "Your RSVP is in. We can't wait to celebrate with you in Ho Tram.", zh: "您的回复已收到。我们迫不及待想在头顿与您共同庆祝！", vi: "Chúng tôi đã nhận được xác nhận của bạn. Rất mong được cùng bạn ăn mừng tại Hồ Tràm." },
  "rsvp.successSchedule": { en: "Check out the schedule →", zh: "查看日程安排 →", vi: "Xem lịch trình →" },

  "rsvp.err.banner": {
    en: "We couldn't confirm your RSVP submitted — this can happen if the site is still on a placeholder endpoint, or your connection dropped. Please try again, or text {name} at {phone} with your details, message {whatsappLink}, or {emailLink} as a backup.",
    zh: "我们无法确认您的回复是否已成功提交——这可能是网站尚未配置好，或网络连接中断所致。请重试，或将您的信息发短信给{name}（{phone}），也可留言{whatsappLink}，或{emailLink}作为备用方式。",
    vi: "Chúng tôi không thể xác nhận việc gửi RSVP của bạn — điều này có thể do trang web vẫn đang dùng địa chỉ tạm thời, hoặc kết nối mạng bị gián đoạn. Vui lòng thử lại, hoặc nhắn tin thông tin của bạn cho {name} theo số {phone}, nhắn qua {whatsappLink}, hoặc {emailLink} như một phương án dự phòng.",
  },
  "rsvp.err.emailUsDirectly": { en: "email us your RSVP directly", zh: "直接通过邮件发送您的回复", vi: "gửi email RSVP trực tiếp cho chúng tôi" },

  /* -------------------------------- Travel -------------------------------- */
  "travel.eyebrow": { en: "Travel & Accommodations", zh: "旅行与住宿", vi: "Du Lịch & Chỗ Ở" },
  "travel.heading": { en: "Flights, visas, and getting to the coast", zh: "航班、签证与前往海边的交通", vi: "Chuyến bay, visa và cách di chuyển ra biển" },
  "travel.sub": { en: "Everything guests ask us, in one skimmable place. Search below, or jump straight to a section.", zh: "宾客常见问题，一站汇总，方便快速浏览。可在下方搜索，或直接跳转至相应板块。", vi: "Mọi câu hỏi khách thường hỏi, gói gọn ở một nơi dễ xem. Tìm kiếm bên dưới, hoặc chuyển thẳng đến một mục." },
  "travel.searchPlaceholder": { en: "Search questions — try “visa” or “Grab”…", zh: "搜索问题——例如输入“签证”或“Grab”……", vi: "Tìm câu hỏi — thử “visa” hoặc “Grab”…" },
  "travel.searchAriaLabel": { en: "Search FAQs", zh: "搜索常见问题", vi: "Tìm kiếm câu hỏi thường gặp" },

  /* ------------------------------- Schedule ------------------------------- */
  "schedule.heading": { en: "Four days, roughly in order", zh: "四天行程，大致顺序如下", vi: "Bốn ngày, theo trình tự" },
  "schedule.sub": { en: "Arrive, get married (that's us), take a free day however you like, then head home. Times marked TODO are still being finalized.", zh: "抵达、见证我们的婚礼、自由安排一天活动，然后启程回家。标注为“待定”的时间仍在最终确认中。", vi: "Đến nơi, dự lễ cưới (của chúng tôi), có một ngày tự do tùy thích, rồi lên đường về nhà. Các mốc thời gian đánh dấu TODO vẫn đang được chốt." },
  "schedule.addToCalendar": { en: "Add to calendar (.ics)", zh: "添加到日历（.ics）", vi: "Thêm vào lịch (.ics)" },
  "schedule.day1": { en: "Day 1", zh: "第1天", vi: "Ngày 1" },
  "schedule.day2": { en: "Day 2", zh: "第2天", vi: "Ngày 2" },
  "schedule.day3": { en: "Day 3", zh: "第3天", vi: "Ngày 3" },
  "schedule.day4": { en: "Day 4", zh: "第4天", vi: "Ngày 4" },
  "schedule.decidingPrefix": { en: "Deciding between Vung Tau and the resort on Day 3? Tell us on the", zh: "还在犹豫第3天是去头顿还是留在度假村？请通过", vi: "Chưa quyết định giữa Vũng Tàu và ở lại khu nghỉ dưỡng vào Ngày 3? Hãy cho chúng tôi biết qua" },
  "schedule.rsvpFormLink": { en: "RSVP form", zh: "回复表单告诉我们", vi: "biểu mẫu RSVP" },
  "schedule.decidingSuffix": { en: "— no pressure either way.", zh: "——两个选择都完全没有压力。", vi: "— chọn bên nào cũng không sao cả." },

  "schedule.arrivalPlanEyebrow": { en: "Suggested arrival plan", zh: "建议行程安排", vi: "Gợi ý kế hoạch đến sớm" },
  "schedule.arrivalPlanHeading": { en: "Come early, decompress twice", zh: "提前抵达，双重放松", vi: "Đến sớm, thư giãn hai lần" },
  "schedule.arrivalPlanP1": {
    en: "The flight is long, and jet lag doesn't care about your itinerary. We'd suggest flying into Ho Chi Minh City <strong>a few days to a week before June 30</strong> — explore the city while you're still running on adrenaline, then head to the resort already unwound.",
    zh: "航程很长，时差也不会体谅您的行程安排。我们建议<strong>提前几天到一周（6月30日之前）</strong>飞抵胡志明市——趁着还处于亢奋状态先逛逛城市，等到达度假村时已经调整好状态。",
    vi: "Chuyến bay khá dài, và lệch múi giờ thì chẳng quan tâm đến lịch trình của bạn. Chúng tôi gợi ý nên bay đến Thành phố Hồ Chí Minh <strong>trước ngày 30/6 vài ngày đến một tuần</strong> — khám phá thành phố khi vẫn còn hưng phấn, rồi đến khu nghỉ dưỡng khi đã thư thái.",
  },
  "schedule.arrivalPlanP2": { en: "In Saigon, a few easy ways to spend the time:", zh: "在西贡，这几种消遣方式轻松又惬意：", vi: "Ở Sài Gòn, đây là vài cách đơn giản để tận hưởng thời gian:" },
  "schedule.arrivalPlanLi1": { en: "Coffee culture — egg coffee, weasel coffee, or just a plastic stool and a strong cà phê sữa đá.", zh: "咖啡文化——蛋咖啡、猫屎咖啡，或者随便找个塑料矮凳，来一杯浓郁的越南冰咖啡（cà phê sữa đá）。", vi: "Văn hóa cà phê — cà phê trứng, cà phê chồn, hay đơn giản là chiếc ghế nhựa với ly cà phê sữa đá đậm đà." },
  "schedule.arrivalPlanLi2": { en: "Street food crawls — bánh mì, phở, and whatever smells the best on the block you're standing on.", zh: "街头美食巡礼——法棍三明治（bánh mì）、越南河粉（phở），还有街角闻起来最香的那一家。", vi: "Lang thang ăn vặt đường phố — bánh mì, phở, và bất cứ món nào thơm nhất ở con phố bạn đang đứng." },
  "schedule.arrivalPlanLi3": { en: "Motorbike-dodging as a spectator sport — find a café balcony over a busy intersection and watch the choreography.", zh: "把“躲摩托车”当成一项观赏运动——找个能俯瞰繁忙路口的咖啡馆阳台，欣赏这场“交通芭蕾”。", vi: "Xem né xe máy như một môn thể thao — tìm ban công quán cà phê nhìn ra ngã tư đông đúc và ngắm màn “vũ điệu” giao thông." },
  "schedule.arrivalPlanP3": { en: "Then Ho Tram will feel like exactly the exhale it's supposed to be.", zh: "之后再到头顿，才会真正感受到那种彻底放松的感觉。", vi: "Sau đó, Hồ Tràm sẽ thực sự mang lại cảm giác thư giãn trọn vẹn như nó vốn nên là." },

  /* --------------------------------- Guide --------------------------------- */
  "guide.eyebrow": { en: "Local guide", zh: "当地指南", vi: "Cẩm nang địa phương" },
  "guide.heading": { en: "How to do Vietnam like you've done it before", zh: "轻松玩转越南，仿佛您早已来过", vi: "Trải nghiệm Việt Nam như thể bạn đã từng đến đây" },
  "guide.sub": { en: "Money, safety, time zones, weather, and what to pack. Skim it once before you leave.", zh: "货币、安全、时区、天气与行李清单——出发前快速浏览一遍即可。", vi: "Tiền bạc, an toàn, múi giờ, thời tiết và những gì cần mang theo. Đọc lướt một lần trước khi lên đường." },
  "guide.navInsider": { en: "Insider guide", zh: "内行指南", vi: "Cẩm nang trong cuộc" },
  "guide.navEat": { en: "What to eat", zh: "美食推荐", vi: "Ăn gì" },
  "guide.navBring": { en: "What to bring", zh: "行李清单", vi: "Mang gì theo" },

  "guide.insiderHeading": { en: "Insider guide", zh: "内行指南", vi: "Cẩm nang trong cuộc" },
  "guide.currencyTitle": { en: "Currency & payments", zh: "货币与支付", vi: "Tiền tệ & thanh toán" },
  "guide.currencyP1": { en: "Use VND wherever you can. Larger venues generally take credit cards, but small vendors are cash-first.", zh: "尽量使用越南盾（VND）。大型场所通常接受信用卡，但小商贩则以现金为主。", vi: "Hãy dùng VND bất cứ khi nào có thể. Các địa điểm lớn thường nhận thẻ tín dụng, nhưng người bán nhỏ lẻ chủ yếu dùng tiền mặt." },
  "guide.currencyP2": { en: "<strong>VPBank ATMs</strong> are the most reliable option for fee-free withdrawals.", zh: "<strong>VPBank的ATM</strong>是免手续费取款最可靠的选择。", vi: "<strong>Máy ATM của VPBank</strong> là lựa chọn đáng tin cậy nhất để rút tiền miễn phí." },
  "guide.currencyP3": { en: "When a card machine asks \"charge in USD or VND?\" — <strong>always choose VND.</strong> That USD option (Dynamic Currency Conversion) is a bad exchange rate with a fee attached, dressed up as a convenience.", zh: "当刷卡机询问“以美元还是越南盾结算？”时——<strong>请务必选择越南盾。</strong>选择美元结算（即动态货币转换，DCC）实际上是打着“方便”旗号的糟糕汇率加额外手续费。", vi: "Khi máy quẹt thẻ hỏi \"thanh toán bằng USD hay VND?\" — <strong>hãy luôn chọn VND.</strong> Lựa chọn USD (chuyển đổi tiền tệ động - DCC) thực chất là tỷ giá bất lợi kèm phí, được ngụy trang thành sự tiện lợi." },
  "guide.tippingTitle": { en: "Tipping", zh: "小费", vi: "Tiền tip" },
  "guide.tippingP1": { en: "Not expected, anywhere. Truly — no mental math required, no guilt if you don't.", zh: "在任何地方都无需给小费。真的——不用心算，不给也完全没有心理负担。", vi: "Không ai mong đợi tiền tip ở bất cứ đâu. Thật đấy — khỏi phải nhẩm tính, không cho cũng chẳng sao." },
  "guide.safetyTitle": { en: "Airport & ride safety", zh: "机场与乘车安全", vi: "An toàn ở sân bay & khi di chuyển" },
  "guide.safetyP1": { en: "Don't accept rides from people who approach you in arrivals. Use Grab, or the official taxi queue.", zh: "不要接受在到达大厅主动搭讪招揽您乘车的人。请使用Grab，或前往官方出租车排队处。", vi: "Đừng nhận lời mời đi xe từ người tiếp cận bạn ở khu vực đến. Hãy dùng Grab, hoặc xếp hàng ở khu taxi chính thức." },
  "guide.safetyP2": { en: "See the {link} for the full rundown on getting around.", zh: "完整的市内交通攻略请见{link}。", vi: "Xem {link} để biết đầy đủ thông tin về cách di chuyển." },
  "guide.travelPageLink": { en: "Travel page", zh: "旅行页面", vi: "trang Du lịch" },
  "guide.weatherTitle": { en: "Weather", zh: "天气", vi: "Thời tiết" },
  "guide.weatherP1": { en: "Late June/early July sits at the start of Ho Tram's wet season. Expect daytime highs around 88–92°F (31–33°C) with high humidity — it rarely feels comfortable to be outside for long without shade.", zh: "六月末至七月初正值头顿雨季伊始。白天气温通常在31–33°C（88–92°F）之间，湿度较高——在户外长时间待着若没有遮荫会相当难受。", vi: "Cuối tháng 6/đầu tháng 7 là thời điểm bắt đầu mùa mưa ở Hồ Tràm. Nhiệt độ ban ngày thường dao động khoảng 31–33°C (88–92°F) với độ ẩm cao — ở ngoài trời lâu mà không có bóng râm sẽ khá khó chịu." },
  "guide.weatherP2": { en: "Rain usually shows up as a short, heavy downpour in the afternoon or evening rather than an all-day soak — mornings are typically clear. Either way, the sun is intense even under clouds, so sunscreen matters daily, not just when it's sunny.", zh: "降雨通常以午后或傍晚短时强降雨的形式出现，而非整日阴雨——早晨一般较为晴朗。不过即便多云，紫外线依然很强，所以每天都需要涂防晒霜，不只是晴天才需要。", vi: "Mưa thường đến bất chợt và khá lớn vào buổi chiều hoặc tối, chứ không mưa dầm cả ngày — buổi sáng thường quang đãng. Dù vậy, ánh nắng vẫn rất gắt kể cả khi trời nhiều mây, nên hãy thoa kem chống nắng mỗi ngày, không chỉ khi trời nắng." },

  "guide.timezoneEyebrow": { en: "Time zone", zh: "时区", vi: "Múi giờ" },
  "guide.timezoneHeading": { en: "Saigon vs. your local time", zh: "西贡时间对比您的当地时间", vi: "Sài Gòn so với giờ địa phương của bạn" },
  "guide.timezoneP": {
    en: "Vietnam runs on <strong>UTC+7</strong> — that's 11 hours ahead of US Eastern and 14 hours ahead of US Pacific in July (US daylight saving is in effect then, Vietnam doesn't observe DST). Here's a live comparison:",
    zh: "越南时间为<strong>UTC+7</strong>——7月份比美国东部时间快11小时，比美国太平洋时间快14小时（当时美国正处于夏令时，越南不实行夏令时）。以下为实时对比：",
    vi: "Việt Nam theo múi giờ <strong>UTC+7</strong> — vào tháng 7, nhanh hơn giờ miền Đông Mỹ 11 tiếng và giờ miền Tây Mỹ 14 tiếng (lúc đó Mỹ đang áp dụng giờ mùa hè, còn Việt Nam thì không). Đây là so sánh theo thời gian thực:",
  },
  "guide.timeCardSaigon": { en: "Ho Tram / Saigon", zh: "头顿 / 西贡", vi: "Hồ Tràm / Sài Gòn" },
  "guide.timeCardYourTime": { en: "Your time", zh: "您的当地时间", vi: "Giờ của bạn" },

  "guide.eatHeading": { en: "What to eat", zh: "美食推荐", vi: "Ăn gì" },
  "guide.eatSub": { en: "Short answer: almost anything. This is one of the best reasons to be early to this wedding.", zh: "简单来说：几乎什么都能吃。这也是提前抵达参加婚礼的最大理由之一。", vi: "Câu trả lời ngắn gọn: gần như món gì cũng được. Đây là một trong những lý do tuyệt vời nhất để đến sớm dự đám cưới này." },
  "guide.eatCard1Title": { en: "Street food essentials", zh: "街头美食必吃", vi: "Món ăn đường phố không thể bỏ qua" },
  "guide.eatCard1Desc": { en: "Bánh mì, phở, bún thịt nướng — from a stall, not just a sit-down restaurant. Some of the best meals in the city cost less than a coffee back home.", zh: "法棍三明治（bánh mì）、越南河粉（phở）、烤肉米线（bún thịt nướng）——从路边摊吃起，而不只是餐厅。这座城市里许多最棒的美食，价格甚至比家乡一杯咖啡还便宜。", vi: "Bánh mì, phở, bún thịt nướng — hãy ăn ở quán vỉa hè, không chỉ nhà hàng. Một số món ngon nhất thành phố còn rẻ hơn một ly cà phê ở quê nhà." },
  "guide.eatCard2Title": { en: "Vietnamese coffee", zh: "越南咖啡", vi: "Cà phê Việt Nam" },
  "guide.eatCard2Desc": { en: "Cà phê sữa đá (iced, with condensed milk) is the everyday order. Egg coffee if you're feeling adventurous. Either way, get it from a plastic stool, not a chain.", zh: "越南冰咖啡（cà phê sữa đá，加炼乳）是日常首选。想尝鲜的话可以试试蛋咖啡。无论哪种，都建议在路边塑料矮凳小店买，而非连锁咖啡店。", vi: "Cà phê sữa đá là lựa chọn thường ngày. Cà phê trứng nếu bạn muốn thử điều mới. Dù chọn món nào, hãy mua ở quán vỉa hè ghế nhựa, không phải chuỗi cửa hàng." },
  "guide.eatCard3Title": { en: "Curated picks in Saigon", zh: "西贡精选推荐", vi: "Gợi ý chọn lọc tại Sài Gòn" },
  "guide.eatCard3Desc": { en: "Want a sure thing? The {link} has both Michelin-rated and Michelin-recommended spots across every budget.", zh: "想要稳妥之选？{link}收录了各种预算的米其林评级及米其林推荐餐厅。", vi: "Muốn một lựa chọn chắc chắn? {link} có cả những địa điểm được Michelin xếp hạng và đề xuất, phù hợp với mọi ngân sách." },
  "guide.michelinLink": { en: "Michelin Guide's Ho Chi Minh City list", zh: "米其林指南胡志明市榜单", vi: "danh sách Michelin Guide tại Thành phố Hồ Chí Minh" },
  "guide.eatCard4Title": { en: "Seafood in Ho Tram", zh: "头顿海鲜", vi: "Hải sản ở Hồ Tràm" },
  "guide.eatCard4Desc": { en: "Being on the coast means fresh seafood is easy to find near the resort.", zh: "身处海岸地区，度假村附近很容易找到新鲜海鲜。", vi: "Nằm ngay ven biển nên hải sản tươi rất dễ tìm gần khu nghỉ dưỡng." },

  "guide.bringHeading": { en: "What to bring", zh: "行李清单", vi: "Mang gì theo" },
  "guide.bringSub": { en: "Items with a “We've got you covered” badge — we'll have spares. Forgetting one isn't a crisis.", zh: "带有“我们已为您备好”标签的物品——我们会准备备用品。忘带了也完全不必担心。", vi: "Các món có nhãn “Chúng tôi lo rồi” — chúng tôi sẽ chuẩn bị sẵn thêm. Quên mang theo cũng không sao cả." },
  "guide.spareBadge": { en: "We've got you covered", zh: "我们已为您备好", vi: "Chúng tôi lo rồi" },
};

/* =============================================================================
   Shuttle schedule table + rules, per language (mirrors renderShuttleScheduleHtml
   in content.js, which stays the English/default version).
   ========================================================================== */
var SHUTTLE_TABLE_STRINGS = {
  en: {
    days: "Days", toHoTram: "HCMC → Ho Tram", toHcmc: "Ho Tram → HCMC",
    monThu: "Mon–Thu", fri: "Friday", sat: "Saturday", sun: "Sunday",
    stationPrefix: "Bus station:", rulesIntro: "A few rules:",
    regulations: SHUTTLE_SCHEDULE.regulations,
  },
  zh: {
    days: "日期", toHoTram: "胡志明市 → 头顿", toHcmc: "头顿 → 胡志明市",
    monThu: "周一至周四", fri: "周五", sat: "周六", sun: "周日",
    stationPrefix: "巴士站：", rulesIntro: "几点须知：",
    regulations: [
      "仅供入住度假村的宾客使用。",
      "先到先得，视座位情况而定。",
      "需提前通过度假村预订部或礼宾部预约座位。",
      "请在发车前20分钟抵达巴士站——Hai Ha Building。",
      "车上须全程佩戴口罩。",
      "除紧急情况或合理请求外，巴士中途不停靠。",
      "车上禁止饮食。",
      "禁止吸烟；如有安全带请系好。",
      "巴士将严格按时刻表准时发车——请勿迟到。",
      "请妥善保管随身物品——如有遗失或损坏，度假村概不负责。",
    ],
  },
  vi: {
    days: "Ngày", toHoTram: "TP.HCM → Hồ Tràm", toHcmc: "Hồ Tràm → TP.HCM",
    monThu: "Thứ 2–Thứ 5", fri: "Thứ 6", sat: "Thứ 7", sun: "Chủ nhật",
    stationPrefix: "Trạm xe:", rulesIntro: "Một vài quy định:",
    regulations: [
      "Chỉ dành cho khách lưu trú tại khu nghỉ dưỡng.",
      "Phục vụ theo thứ tự đăng ký trước, tùy số chỗ còn trống.",
      "Cần đặt chỗ trước với bộ phận Đặt phòng hoặc Lễ tân của khu nghỉ dưỡng.",
      "Vui lòng có mặt tại trạm xe — Tòa nhà Hai Ha — trước giờ khởi hành 20 phút.",
      "Bắt buộc đeo khẩu trang trên xe.",
      "Xe không dừng dọc đường trừ trường hợp khẩn cấp hoặc yêu cầu hợp lý.",
      "Không ăn uống trên xe.",
      "Không hút thuốc; vui lòng thắt dây an toàn nếu có.",
      "Xe khởi hành đúng giờ theo lịch trình — đừng đến trễ.",
      "Hãy tự bảo quản đồ đạc cá nhân — khu nghỉ dưỡng không chịu trách nhiệm nếu thất lạc hoặc hư hỏng trên xe.",
    ],
  },
};

function renderShuttleScheduleHtmlForLang(lang) {
  var s = SHUTTLE_SCHEDULE;
  var t = SHUTTLE_TABLE_STRINGS[lang] || SHUTTLE_TABLE_STRINGS.en;
  var rows = [
    [t.monThu, s.toHoTram["mon-thu"], s.toHCMC["mon-thu"]],
    [t.fri, s.toHoTram.fri, s.toHCMC.fri],
    [t.sat, s.toHoTram.sat, s.toHCMC.sat],
    [t.sun, s.toHoTram.sun, s.toHCMC.sun],
  ];
  var rowsHtml = rows
    .map(function (r) {
      return "<tr><th scope=\"row\">" + r[0] + "</th><td>" + r[1].join(", ") + "</td><td>" + r[2].join(", ") + "</td></tr>";
    })
    .join("");
  var regsHtml = t.regulations.map(function (r) { return "<li>" + r + "</li>"; }).join("");

  return (
    "<div class=\"table-scroll\"><table class=\"shuttle-table\">" +
    "<caption class=\"visually-hidden\">Shuttle bus schedule between Ho Chi Minh City and Ho Tram</caption>" +
    "<thead><tr><th scope=\"col\">" + t.days + "</th><th scope=\"col\">" + t.toHoTram + "</th><th scope=\"col\">" + t.toHcmc + "</th></tr></thead>" +
    "<tbody>" + rowsHtml + "</tbody></table></div>" +
    "<p style=\"margin-top: 1rem;\">" + t.stationPrefix + " <strong>" + s.station + "</strong>. " + t.rulesIntro + "</p>" +
    "<ul>" + regsHtml + "</ul>"
  );
}

/* =============================================================================
   CONTENT_TRANSLATIONS — overrides for content.js data, keyed by the same
   `id` fields already on those objects. English (content.js itself) is the
   fallback whenever a key is missing here.
   ========================================================================== */
var CONTENT_TRANSLATIONS = {
  zh: {
    faqCategories: {
      flights: "航班", visas: "签证", arriving: "抵达西贡机场", phones: "电话与网络",
      "getting-around": "市内交通", "where-to-stay": "住宿推荐", "what-to-eat": "美食推荐",
    },
    faqs: {
      "faq-direct-flights": {
        question: "如何前往西贡？",
        answer: "<p><strong>越南航空（Vietnam Airlines）</strong>是唯一一家从美国直飞西贡（SGN）的航空公司，可从多个门户城市出发。其他航空公司都至少需要转机一次——可经由东京、首尔或台北等枢纽转机，正好可以借此机会分段旅行，缓解长途飞行的疲惫。</p><p>无论选择哪条路线，请务必确认最终目的地是胡志明市的<strong>新山一国际机场（SGN）</strong>——而不是河内（HAN）或越南其他城市，否则还需再转一趟国内航班才能抵达西贡。</p>",
      },
      "faq-when-to-book": {
        question: "应该何时预订机票？",
        answer: "<p>六月末至七月初正值旅游旺季，请勿拖延预订。<strong>2027年1月或2月</strong>是预订机票的最佳时机——更早一些则可先设置票价提醒，了解“正常”价格区间，以免临近出发时价格上涨。</p><p>飞行时间较长，时差反应也不容小觑。这也是建议提前几天抵达的另一个理由（详见<a href=\"schedule.html#arrival-plan\">建议行程安排</a>）。</p>",
      },
      "faq-do-i-need-a-visa": {
        question: "我需要签证吗？",
        answer: "<p>这取决于您的护照——请务必提前确认，切勿想当然。多数旅客可在线申请电子签证。</p><p>电子签证申请请通过越南政府官方网站办理：<a href=\"https://evisa.gov.vn/\" target=\"_blank\" rel=\"noopener\">evisa.gov.vn</a>。电子签证处理时间<strong>至少需要2周</strong>。不过越南的办事节奏有其自身规律，建议不要在出发前不到<strong>一个月</strong>才申请。</p><p><strong>也请确认护照的有效期：</strong>越南要求护照在您行程结束后仍至少有<strong>6个月的有效期</strong>。如果您的护照有效期比较紧张，现在正是办理续签的好时机。</p><p><strong>请注意：</strong>网络上存在一些山寨第三方签证网站，会为同样的服务额外收费。如有疑问，请务必使用上方官方链接evisa.gov.vn。</p>",
      },
      "faq-customs": {
        question: "西贡机场的海关与入境流程是怎样的？",
        answer: "<p>入境排队时间可能较长，尤其是多个国际航班同时抵达时。请务必保持耐心，随身携带（或电子存档）护照及签证批件（如需要），并预留充足时间，再安排后续行程。</p>",
      },
      "faq-phones-data": {
        question: "我的手机在越南能用吗？",
        answer: "<p>部分美国运营商——包括T-Mobile在内——的某些套餐包含免费国际数据与短信服务。请务必提前确认您所用的具体套餐是否涵盖此项服务，并非所有T-Mobile套餐都包含。</p><p>如果您的运营商不支持，购买当地eSIM是一个简单又实惠的替代方案，可在抵达前提前设置好。</p>",
      },
      "faq-grab": {
        question: "抵达后如何在当地出行？",
        answer: "<p>请在抵达前下载<strong>Grab</strong>（越南版的Uber）。无论是在市内还是前往婚礼场地，都会用得上。</p><p>注册或使用Grab并不需要越南本地电话号码——您平时使用的号码即可。但需要有网络数据，因此请确保在落地前手机套餐或eSIM已生效（详见上方“电话与网络”部分）。</p><p>可用越南盾现金支付，也可在App内绑定信用卡——两种方式都可行。</p><p><strong>请勿搭乘在机场到达区主动搭讪招揽您的“黑车”。</strong>请直接忽略他们，务必通过App在指定上车点预约用车。</p><p>另外提醒一点：越南没有给小费的习惯，无需给Grab司机小费。</p>",
      },
      "faq-getting-to-ho-tram": {
        question: "如何从西贡前往头顿？",
        answer:
          "<p>头顿距离西贡市中心约<strong>2.5–3小时</strong>车程。</p><p>度假村提供往返胡志明市的定期班车——具体时刻表根据星期几而有所不同：</p>" +
          renderShuttleScheduleHtmlForLang("zh") +
          "<p style=\"margin-top: 1rem;\">此外，Grab也是前往头顿的可靠选择。</p>",
      },
      "faq-where-to-stay": {
        question: "我们应该住在哪里？",
        answer:
          "<h4>头顿本地</h4><p>我们已在<strong id=\"faq-hotel-name\">TODO: Resort Name</strong>预留了房间区块。标准客房、套房及别墅均可供选择，具体视您的团队人数与预算而定。</p><ul><li><strong>预订链接：</strong> <a id=\"faq-hotel-link\" href=\"https://example.com/TODO-booking-link\" target=\"_blank\" rel=\"noopener\">TODO: paste booking link</a></li><li><strong>房间区块代码：</strong> <span id=\"faq-hotel-code\">TODO-ROOM-BLOCK-CODE</span></li><li><strong>咨询：</strong> <span id=\"faq-hotel-contact\">TODO@example.com</span></li></ul>" +
          "<h4 style=\"margin-top: 1.5rem;\">胡志明市市区</h4><p>如果您计划提前抵达，先游览西贡市区（详见<a href=\"schedule.html#arrival-plan\">建议行程安排</a>），以下几个区域值得考虑入住：</p><ul>" +
          "<li><strong>第一郡（District 1）</strong> ——最热闹的市中心区域，步行可达各大景点、餐厅与夜生活场所。若想住在最繁华的地段，选这里就对了。</li>" +
          "<li><strong>第四郡（District 4）</strong> ——紧邻第一郡，但更为安静，交通也不那么拥堵。如果既想靠近市中心，又想避开第一郡的喧嚣，这是不错的选择。</li>" +
          "<li><strong>平盛郡（Bình Thạnh）</strong> ——同样是很好的选择，更贴近本地生活气息，出行也很方便。</li>" +
          "</ul><p>关于附近的美食推荐，请见下方<a href=\"#what-to-eat\">美食推荐</a>板块。</p>",
      },
      "faq-what-to-eat": {
        question: "在当地应该吃些什么？",
        answer:
          "<p>简单来说：几乎什么都值得一试。越南美食本身就是提前抵达这场婚礼的绝佳理由之一。</p>" +
          "<h4>在西贡</h4><p>不妨从基本款开始——<strong>法棍三明治（bánh mì）</strong>、<strong>越南河粉（phở）</strong>和<strong>烤肉米线（bún thịt nướng）</strong>——建议在路边摊尝试，而不仅限于正式餐厅。这座城市里最美味的一些餐点，价格甚至比家乡一杯咖啡还便宜。摊位前排长队通常是美味的信号，而非需要避开的警示。</p>" +
          "<p>想要更有把握的选择？<a href=\"https://guide.michelin.com/us/en/restaurants?q=Ho+Chi+Minh+City+vietnam&amp;seeAll=true\" target=\"_blank\" rel=\"noopener\">米其林指南胡志明市榜单</a>收录了各种预算的米其林评级及米其林推荐餐厅——既有平价美食，也不乏精致品鉴菜单。</p>" +
          "<h4 style=\"margin-top: 1.5rem;\">在头顿</h4><p>身处海岸地区，度假村附近很容易找到新鲜海鲜。</p>",
      },
    },
    itinerary: {
      1: {
        label: "第1天", vibe: "抵达、放松、享用美食。",
        events: {
          arrivals: { title: "抵达西贡机场（SGN）", description: "无论您的航班何时抵达都没关系——并没有统一的集合抵达时间。乘坐Grab是前往酒店或直达头顿最便捷的方式。", time: "全天" },
          "shuttle-arrival": { title: "前往头顿的班车", description: "待确认具体时间。我们将安排几个从胡志明市出发的班车时段，方便不想单独打车的宾客结伴同行。", timeTemplate: "度假村从胡志明市出发的班车时间为{times}，即您的抵达当天。请提前通过度假村预订部/礼宾部预约座位——完整周班车时刻表详见旅行页面。若未能预约，Grab也同样方便。" },
          dinner: { title: "欢迎晚宴", description: "轻松随性的度假村晚宴，长途飞行后无需盛装出席，穿着舒适即可前来。具体时间待通知——目前所示为暂定时间。", time: "TODO：晚上7点（暂定）" },
        },
      },
      2: {
        label: "第2天", vibe: "婚礼当天。",
        events: {
          ceremony: { title: "婚礼仪式", description: "具体流程仍在最终确定中。待确认仪式开始时间及场地内具体地点。", time: "TODO：仪式时间待定" },
          cocktail: { title: "鸡尾酒会", description: "具体时间待确认。届时将提供饮品与小食，供大家稍作休憩。", time: "TODO：鸡尾酒会时间待定" },
          reception: { title: "婚宴", description: "晚餐、祝酒致辞与舞会。待确认婚宴开始与结束时间。", time: "TODO：婚宴时间待定" },
        },
      },
      3: {
        label: "第3天", vibe: "自由活动日——可选择前往头顿或留在度假村。",
        events: {
          "shuttle-vungtau": { title: "前往头顿的班车（可选）", description: "适合想体验一日游的宾客——海岸风光、新鲜海鲜、换个环境放松身心。出发与返回时间待确认。", time: "TODO：待确认具体时间" },
          relax: { title: "或：留在度假村休息", description: "同样是绝佳选择。游泳池、沙滩、水疗，或者好好补一觉、调整时差。请在回复表单中告知我们您的意向。", time: "全天" },
        },
      },
      4: {
        label: "第4天", vibe: "退房、道别、启程返程。",
        events: {
          checkout: { title: "退房", description: "待确认标准退房时间，以及此预订区块是否可申请延迟退房。", time: "TODO：退房时间待定" },
          departures: { title: "启程返程", description: "待确认航班较晚出发的宾客可用的行李寄存方案。大多数宾客将在7月4日假期周末期间飞回家。", timeTemplate: "度假村返回胡志明市的班车时间为{times}。待确认航班较晚出发的宾客可用的行李寄存方案。大多数宾客将在7月4日假期周末期间飞回家。" },
        },
      },
    },
    packingList: {
      mosquito: { label: "驱蚊用品", note: "如有惯用品牌请自带——我们也会准备备用品。" },
      swimwear: { label: "短裤与泳衣", note: "天气炎热，您每天都会用得上。" },
      umbrella: { label: "雨伞或轻便雨衣", note: "可能会下雨。度假村备有雨伞可供借用，但外出游玩当天带一件可折叠雨衣会更方便。" },
      sandals: { label: "凉鞋", note: "轻便透气，不惧沙滩。度假村也备有可借用的凉鞋。" },
      hat: { label: "帽子", note: "真正会戴得住的防晒帽。" },
      attire: { label: "海滩婚礼着装", note: "为炎热天气着装，而非为办公室着装——轻薄面料，避免厚重衣物。无需西装外套或正装，商务休闲装完全没问题。" },
      sunscreen: { label: "防晒霜", note: "如有护礁型防晒霜更佳。阳光可不会通融。" },
      golf: { label: "高尔夫装备（可选）", note: "附近设有球场，可租用球杆；请留意着装要求。", linkLabel: "The Bluffs Ho Tram Strip" },
    },
  },

  vi: {
    faqCategories: {
      flights: "Chuyến bay", visas: "Visa", arriving: "Đến sân bay SGN", phones: "Điện thoại & Mạng",
      "getting-around": "Di chuyển", "where-to-stay": "Chỗ ở", "what-to-eat": "Ăn gì",
    },
    faqs: {
      "faq-direct-flights": {
        question: "Chúng tôi đến Sài Gòn bằng cách nào?",
        answer: "<p><strong>Vietnam Airlines</strong> là hãng duy nhất có chuyến bay thẳng đến Sài Gòn (SGN) từ Mỹ, khởi hành từ nhiều thành phố cửa ngõ. Mọi hãng khác đều cần quá cảnh ít nhất một lần — có nhiều lựa chọn quá cảnh qua Tokyo, Seoul hoặc Đài Bắc, một cái cớ hay để chia nhỏ chặng bay dài.</p><p>Dù chọn hành trình nào, hãy đảm bảo điểm đến cuối cùng là <strong>Sân bay Quốc tế Tân Sơn Nhất (SGN)</strong> tại Thành phố Hồ Chí Minh — không phải Hà Nội (HAN) hay thành phố khác của Việt Nam, vì như vậy bạn sẽ cần bay thêm một chặng nội địa nữa mới đến được Sài Gòn.</p>",
      },
      "faq-when-to-book": {
        question: "Khi nào nên đặt vé máy bay?",
        answer: "<p>Cuối tháng 6/đầu tháng 7 là mùa cao điểm, đừng chần chừ. <strong>Tháng 1 hoặc tháng 2 năm 2027</strong> là thời điểm lý tưởng để săn vé — hãy đặt cảnh báo giá sớm hơn để biết mức giá \"bình thường\" trước khi giá tăng.</p><p>Chuyến bay khá dài và tình trạng lệch múi giờ là có thật. Đó là một lý do nữa để đến sớm vài ngày (xem <a href=\"schedule.html#arrival-plan\">gợi ý kế hoạch đến sớm</a>).</p>",
      },
      "faq-do-i-need-a-visa": {
        question: "Tôi có cần visa không?",
        answer: "<p>Tùy vào hộ chiếu của bạn — hãy kiểm tra trước, đừng mặc định. Nhiều du khách có thể xin e-visa trực tuyến.</p><p>Đơn xin e-visa được nộp qua cổng thông tin chính thức của chính phủ: <a href=\"https://evisa.gov.vn/\" target=\"_blank\" rel=\"noopener\">evisa.gov.vn</a>. E-visa cần <strong>ít nhất 2 tuần</strong> để xử lý. Nhưng mọi thứ ở Việt Nam vận hành theo nhịp riêng, nên đừng đợi đến sát ngày đi mới nộp — hãy nộp trước chuyến đi <strong>ít nhất một tháng</strong>.</p><p><strong>Cũng nên kiểm tra ngày hết hạn hộ chiếu:</strong> Việt Nam yêu cầu hộ chiếu còn hiệu lực <strong>ít nhất 6 tháng</strong> tính từ sau ngày kết thúc chuyến đi. Nếu hộ chiếu của bạn sắp hết hạn, đây là lúc tốt để gia hạn.</p><p><strong>Lưu ý:</strong> có những trang web visa bên thứ ba giả mạo, tính thêm phí cho cùng một dịch vụ. Nếu không chắc chắn, hãy dùng đúng liên kết chính thức evisa.gov.vn ở trên.</p>",
      },
      "faq-customs": {
        question: "Thủ tục hải quan và nhập cảnh ở SGN như thế nào?",
        answer: "<p>Hàng chờ nhập cảnh có thể khá dài, đặc biệt khi nhiều chuyến bay quốc tế hạ cánh cùng lúc. Hãy kiên nhẫn, chuẩn bị sẵn hộ chiếu và (nếu cần) visa đã được duyệt (bản in hoặc lưu trên điện thoại), và dành thêm thời gian trước khi lên kế hoạch di chuyển tiếp theo.</p>",
      },
      "faq-phones-data": {
        question: "Điện thoại của tôi có dùng được ở Việt Nam không?",
        answer: "<p>Một số nhà mạng Mỹ — trong đó có T-Mobile — có gói cước bao gồm dữ liệu và nhắn tin quốc tế miễn phí. Hãy kiểm tra kỹ gói cước của bạn trước khi mặc định là có; không phải gói T-Mobile nào cũng bao gồm dịch vụ này.</p><p>Nếu nhà mạng của bạn không hỗ trợ, eSIM địa phương là lựa chọn thay thế dễ dàng và rẻ, có thể thiết lập trước khi hạ cánh.</p>",
      },
      "faq-grab": {
        question: "Sau khi hạ cánh, chúng tôi di chuyển bằng cách nào?",
        answer: "<p>Hãy tải <strong>Grab</strong> (ứng dụng kiểu Uber của Việt Nam) trước khi đến. Bạn sẽ dùng nó trong thành phố và để đến địa điểm tổ chức tiệc cưới.</p><p>Bạn không cần số điện thoại Việt Nam để đăng ký hay sử dụng — số điện thoại thường ngày của bạn vẫn dùng được. Tuy nhiên bạn cần có dữ liệu mạng, vì vậy hãy đảm bảo gói cước hoặc eSIM đã kích hoạt trước khi hạ cánh (xem phần Điện thoại & Mạng ở trên).</p><p>Thanh toán bằng tiền mặt VND hoặc liên kết thẻ tín dụng trong ứng dụng — cả hai cách đều được.</p><p><strong>Đừng nhận lời mời đi xe từ những người tiếp cận bạn ở khu vực đến của sân bay.</strong> Hãy phớt lờ họ và đặt xe qua ứng dụng tại điểm đón chỉ định.</p><p>Thêm một điều nữa: Việt Nam không có văn hóa tip. Không cần tip tài xế Grab.</p>",
      },
      "faq-getting-to-ho-tram": {
        question: "Chúng tôi di chuyển từ Sài Gòn đến Hồ Tràm như thế nào?",
        answer:
          "<p>Hồ Tràm cách trung tâm Sài Gòn khoảng <strong>2,5–3 giờ</strong> đi đường bộ.</p><p>Khu nghỉ dưỡng có xe đưa đón thường xuyên đến/từ Thành phố Hồ Chí Minh — lịch chạy tùy theo ngày trong tuần:</p>" +
          renderShuttleScheduleHtmlForLang("vi") +
          "<p style=\"margin-top: 1rem;\">Ngoài ra, Grab cũng là lựa chọn đáng tin cậy cho chặng đường này.</p>",
      },
      "faq-where-to-stay": {
        question: "Chúng tôi nên ở đâu?",
        answer:
          "<h4>Tại Hồ Tràm</h4><p>Chúng tôi đã đặt sẵn một khối phòng tại <strong id=\"faq-hotel-name\">TODO: Resort Name</strong>. Có phòng tiêu chuẩn, suite và villa tùy theo số lượng người và ngân sách của bạn.</p><ul><li><strong>Liên kết đặt phòng:</strong> <a id=\"faq-hotel-link\" href=\"https://example.com/TODO-booking-link\" target=\"_blank\" rel=\"noopener\">TODO: paste booking link</a></li><li><strong>Mã khối phòng:</strong> <span id=\"faq-hotel-code\">TODO-ROOM-BLOCK-CODE</span></li><li><strong>Thắc mắc:</strong> <span id=\"faq-hotel-contact\">TODO@example.com</span></li></ul>" +
          "<h4 style=\"margin-top: 1.5rem;\">Trung tâm Thành phố Hồ Chí Minh</h4><p>Nếu bạn đến sớm để khám phá Sài Gòn trước (xem <a href=\"schedule.html#arrival-plan\">gợi ý kế hoạch đến sớm</a>), đây là vài khu vực đáng cân nhắc để đặt phòng:</p><ul>" +
          "<li><strong>Quận 1</strong> — trung tâm sôi động của thành phố. Dễ đi bộ, tập trung nhiều điểm tham quan, nhà hàng và cuộc sống về đêm. Chọn nơi này nếu bạn muốn ở ngay giữa mọi hoạt động.</li>" +
          "<li><strong>Quận 4</strong> — sát ngay bên Quận 1, nhưng yên tĩnh hơn và ít kẹt xe hơn. Lựa chọn tốt nếu vẫn muốn ở gần trung tâm nhưng tránh sự náo nhiệt của Quận 1.</li>" +
          "<li><strong>Quận Bình Thạnh</strong> — một lựa chọn tuyệt vời khác. Mang chất địa phương hơn một chút, vẫn dễ dàng di chuyển từ đây.</li>" +
          "</ul><p>Về gợi ý ăn uống gần nơi bạn ở, xem mục <a href=\"#what-to-eat\">Ăn gì</a> bên dưới.</p>",
      },
      "faq-what-to-eat": {
        question: "Chúng tôi nên ăn gì trong thời gian ở đó?",
        answer:
          "<p>Trả lời ngắn gọn: hầu như món gì cũng nên thử. Ẩm thực Việt Nam là một trong những lý do tuyệt vời nhất để đến sớm dự đám cưới này.</p>" +
          "<h4>Ở Sài Gòn</h4><p>Bắt đầu với những món cơ bản — <strong>bánh mì</strong>, <strong>phở</strong>, và <strong>bún thịt nướng</strong> — ăn ở quán vỉa hè, không chỉ ở nhà hàng ngồi. Một số bữa ăn ngon nhất thành phố có giá rẻ hơn một ly cà phê ở quê nhà. Quán đông khách xếp hàng thường là dấu hiệu tốt, không phải điều đáng ngại.</p>" +
          "<p>Muốn một lựa chọn chắc chắn hơn? <a href=\"https://guide.michelin.com/us/en/restaurants?q=Ho+Chi+Minh+City+vietnam&amp;seeAll=true\" target=\"_blank\" rel=\"noopener\">Danh sách Michelin Guide tại Thành phố Hồ Chí Minh</a> có cả những địa điểm được Michelin xếp hạng và đề xuất, phù hợp với mọi mức ngân sách — không chỉ có thực đơn thưởng thức cao cấp mà cả món ăn bình dân.</p>" +
          "<h4 style=\"margin-top: 1.5rem;\">Ở Hồ Tràm</h4><p>Nằm ngay ven biển nên hải sản tươi rất dễ tìm gần khu nghỉ dưỡng.</p>",
      },
    },
    itinerary: {
      1: {
        label: "Ngày 1", vibe: "Đến nơi, thở phào, ăn uống.",
        events: {
          arrivals: { title: "Đến sân bay Sài Gòn (SGN)", description: "Hạ cánh bất cứ lúc nào chuyến bay của bạn đến — không có giờ tập trung chung. Grab là cách dễ nhất để về khách sạn hoặc thẳng đến Hồ Tràm.", time: "Cả ngày" },
          "shuttle-arrival": { title: "Khung giờ xe đưa đón đến Hồ Tràm", description: "TODO: xác nhận thời gian. Chúng tôi sẽ sắp xếp vài khung giờ xe đưa đón từ TP.HCM cho những ai muốn đi cùng nhau thay vì tự đi Grab.", timeTemplate: "Xe đưa đón của khu nghỉ dưỡng từ TP.HCM chạy vào {times} trong ngày bạn đến. Cần đặt chỗ trước với bộ phận Đặt phòng/Lễ tân của khu nghỉ dưỡng — xem lịch chạy đầy đủ trong tuần tại trang Du lịch. Nếu không thì Grab cũng rất tiện." },
          dinner: { title: "Tiệc chào mừng", description: "Không gian thoải mái, ngay tại khu nghỉ dưỡng, cứ đến với trang phục thoải mái sau chuyến bay dài. Chi tiết sẽ được cập nhật sau — giờ giấc hiện tại chỉ là tạm thời.", time: "TODO: 7:00 PM (tạm thời)" },
        },
      },
      2: {
        label: "Ngày 2", vibe: "Ngày cưới.",
        events: {
          ceremony: { title: "Lễ cưới", description: "Chương trình chi tiết vẫn đang được hoàn thiện. TODO: xác nhận giờ bắt đầu lễ cưới và vị trí cụ thể trong khuôn viên.", time: "TODO: giờ làm lễ" },
          cocktail: { title: "Tiệc cocktail", description: "TODO: xác nhận thời gian. Đồ uống, món nhẹ, và chút thời gian thư giãn.", time: "TODO: giờ tiệc cocktail" },
          reception: { title: "Tiệc chiêu đãi", description: "Ăn tối, phát biểu chúc mừng, khiêu vũ. TODO: xác nhận giờ bắt đầu và kết thúc tiệc.", time: "TODO: giờ tiệc chiêu đãi" },
        },
      },
      3: {
        label: "Ngày 3", vibe: "Ngày tự do — đi Vũng Tàu, hoặc không.",
        events: {
          "shuttle-vungtau": { title: "Xe đưa đón đến Vũng Tàu (tùy chọn)", description: "Chuyến đi trong ngày cho ai muốn trải nghiệm — bờ biển, hải sản, đổi gió một chút. Giờ khởi hành và quay về: TODO xác nhận.", time: "TODO: xác nhận giờ giấc" },
          relax: { title: "Hoặc: nghỉ ngơi tại khu nghỉ dưỡng", description: "Lựa chọn cũng tuyệt không kém. Hồ bơi, bãi biển, spa, hoặc một giấc ngủ giúp bạn hết lệch múi giờ. Hãy cho chúng tôi biết lựa chọn của bạn trong biểu mẫu RSVP.", time: "Cả ngày" },
        },
      },
      4: {
        label: "Ngày 4", vibe: "Trả phòng, ôm tạm biệt, lên đường.",
        events: {
          checkout: { title: "Trả phòng", description: "TODO: xác nhận giờ trả phòng tiêu chuẩn và liệu khối phòng này có được trả phòng muộn hay không.", time: "TODO: giờ trả phòng" },
          departures: { title: "Khởi hành về nước", description: "TODO: xác nhận dịch vụ giữ hành lý cho ai có chuyến bay muộn từ SGN. Hầu hết khách sẽ bay về vào dịp nghỉ lễ 4/7.", timeTemplate: "Xe đưa đón của khu nghỉ dưỡng về TP.HCM chạy vào {times}. TODO: xác nhận dịch vụ giữ hành lý cho ai có chuyến bay muộn từ SGN. Hầu hết khách sẽ bay về vào dịp nghỉ lễ 4/7." },
        },
      },
    },
    packingList: {
      mosquito: { label: "Thuốc chống muỗi", note: "Mang theo loại bạn thích nếu có — chúng tôi cũng sẽ chuẩn bị sẵn thêm." },
      swimwear: { label: "Quần short & đồ bơi", note: "Trời sẽ nóng. Bạn sẽ cần dùng mỗi ngày." },
      umbrella: { label: "Ô/dù hoặc áo mưa nhẹ", note: "Có thể sẽ có mưa. Khu nghỉ dưỡng có sẵn ô để dùng thêm, nhưng một chiếc áo mưa gọn nhẹ sẽ tiện hơn vào những ngày đi chơi xa." },
      sandals: { label: "Dép", note: "Nhẹ nhàng, thoáng khí, hợp với cát. Có sẵn để dùng thêm." },
      hat: { label: "Mũ", note: "Loại mũ chống nắng bạn thực sự sẽ đội." },
      attire: { label: "Trang phục dự tiệc cưới bãi biển", note: "Mặc thoải mái cho thời tiết nóng, không cần trang trọng như ở văn phòng — vải mỏng nhẹ, tránh đồ dày. Không cần vest hay áo blazer; trang phục công sở thoải mái (business casual) là hoàn toàn ổn." },
      sunscreen: { label: "Kem chống nắng", note: "Loại an toàn cho rạn san hô nếu bạn có. Nắng ở đây không nương tay đâu." },
      golf: { label: "Đồ chơi golf (tùy chọn)", note: "Có sân golf gần đó. Có thể thuê gậy; lưu ý có quy định trang phục.", linkLabel: "The Bluffs Ho Tram Strip" },
    },
  },
};

/* =============================================================================
   Public API
   ========================================================================== */
var I18N = (function () {
  var STORAGE_KEY = "wedding_lang";
  var VISITED_KEY = "wedding_lang_modal_seen";

  function getLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED_LANGUAGES.some(function (l) { return l.code === stored; })) return stored;
    } catch (e) { /* localStorage unavailable (private mode, etc.) */ }
    return "en";
  }

  function setLang(code) {
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* ignore */ }
  }

  function hasSeenModal() {
    try { return localStorage.getItem(VISITED_KEY) === "1"; } catch (e) { return true; }
  }

  function markModalSeen() {
    try { localStorage.setItem(VISITED_KEY, "1"); } catch (e) { /* ignore */ }
  }

  function localeCode() {
    return LOCALE_MAP[getLang()] || "en-US";
  }

  function interpolate(str, vars) {
    if (!vars) return str;
    return Object.keys(vars).reduce(function (acc, key) {
      return acc.split("{" + key + "}").join(vars[key]);
    }, str);
  }

  function t(key, vars) {
    var lang = getLang();
    var entry = UI_STRINGS[key];
    if (!entry) return key;
    var str = entry[lang] || entry.en || "";
    return interpolate(str, vars);
  }

  function translateFaqCategory(cat) {
    var lang = getLang();
    var override = CONTENT_TRANSLATIONS[lang] && CONTENT_TRANSLATIONS[lang].faqCategories;
    return (override && override[cat.id]) || cat.label;
  }

  function translateFaq(faq) {
    var lang = getLang();
    var override = CONTENT_TRANSLATIONS[lang] && CONTENT_TRANSLATIONS[lang].faqs && CONTENT_TRANSLATIONS[lang].faqs[faq.id];
    if (!override) return { question: faq.question, answer: faq.answer };
    return { question: override.question || faq.question, answer: override.answer || faq.answer };
  }

  function translateItineraryDay(day) {
    var lang = getLang();
    var override = CONTENT_TRANSLATIONS[lang] && CONTENT_TRANSLATIONS[lang].itinerary && CONTENT_TRANSLATIONS[lang].itinerary[day.day];
    var label = (override && override.label) || day.label;
    var vibe = (override && override.vibe) || day.vibe;
    var events = day.events.map(function (ev) {
      var evOverride = override && override.events && override.events[ev.id];
      if (!evOverride) return ev;
      var description = evOverride.description || ev.description;
      var time = evOverride.time || ev.time;
      // Dynamic shuttle events (Day 1 arrival shuttle, Day 4 departures) carry
      // a {times}-templated description so the already-computed real times
      // (from content.js) get substituted into the translated sentence too;
      // the displayed time itself is rebuilt the same way, with a localized
      // "or" connector between the possible shuttle windows.
      if (evOverride.timeTemplate) {
        var group = ev.id === "shuttle-arrival" ? SHUTTLE_SCHEDULE.arrivalGroup : SHUTTLE_SCHEDULE.departureGroup;
        var timesSource = ev.id === "shuttle-arrival" ? SHUTTLE_SCHEDULE.toHoTram : SHUTTLE_SCHEDULE.toHCMC;
        var timesList = timesSource[group] || [];
        var times = timesList.join(" " + t("common.or") + " ");
        description = evOverride.timeTemplate.split("{times}").join(times);
        time = times;
      }
      return {
        id: ev.id,
        time: time,
        icon: ev.icon,
        title: evOverride.title || ev.title,
        description: description,
      };
    });
    var dateDisplay = new Date(day.dateISO + "T00:00:00").toLocaleDateString(LOCALE_MAP[lang] || "en-US", {
      month: "long",
      day: "numeric",
    });
    return { day: day.day, dateISO: day.dateISO, label: label, dateDisplay: dateDisplay, vibe: vibe, events: events };
  }

  function translatePackingItem(item) {
    var lang = getLang();
    var override = CONTENT_TRANSLATIONS[lang] && CONTENT_TRANSLATIONS[lang].packingList && CONTENT_TRANSLATIONS[lang].packingList[item.id];
    if (!override) return item;
    return Object.assign({}, item, {
      label: override.label || item.label,
      note: override.note || item.note,
      linkLabel: override.linkLabel || item.linkLabel,
    });
  }

  return {
    languages: SUPPORTED_LANGUAGES,
    getLang: getLang,
    setLang: setLang,
    hasSeenModal: hasSeenModal,
    markModalSeen: markModalSeen,
    localeCode: localeCode,
    t: t,
    translateFaqCategory: translateFaqCategory,
    translateFaq: translateFaq,
    translateItineraryDay: translateItineraryDay,
    translatePackingItem: translatePackingItem,
  };
})();
