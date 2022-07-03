import React from 'react';
import { Image, Text, TouchableOpacity, View, BackHandler, ScrollView, StyleSheet } from 'react-native';
import HeaderBar from '../../elements/HeaderBar';
import { ICON_BACK } from '../../constants';
import vw from '../../utils/size-dynamic';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { MyStatusBar } from '../../elements/MyStatusBar';
import { dataPolicy } from '../../constants/data';
type Props = {
  navigation: Function;
};
type State = {};
class HelpScreen extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this._goBack = this._goBack.bind(this);
    this._handleBackPress = this._handleBackPress.bind(this);
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
  }

  componentDidMount() {}

  _handleBackPress() {
    this._goBack();
    return true;
  }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _renderHeaderLeft() {
    const dataHelpScreen = this.props.navigation.getParam('dataHelpScreen', null);
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this._goBack}>
        <Image
          source={ICON_BACK}
          style={{ width: vw(11), height: vw(20), resizeMode: 'contain', marginRight: vw(10) }}
        />
        <Text style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          {dataHelpScreen.screenType === 'GENERAL_POLICY' && 'Chính sách chung'}
          {dataHelpScreen.screenType === 'SECURE_POLICY' && 'Quyền hạn riêng tư'}
          {dataHelpScreen.screenType === 'INFO_SUPPORT' && 'Thông tin hỗ trợ'}
          {dataHelpScreen.screenType === 'LEGAL_INFO' && 'Thông tin pháp lý'}
          {dataHelpScreen.screenType === 'POLICY_APPLICATION' && 'Điều khoản sử dụng'}
        </Text>
      </TouchableOpacity>
    );
  }

  _renderGeneralPolicy() {
    return (
      <ScrollView>
        <View style={{ padding: vw(15) }}>
          <Text style={styles.title}>1. GIỚI THIỆU</Text>
          <Text style={styles.p}>
            Ứng dụng này thuộc quyền sở hữu và quản lý của Công ty Cổ Phần Đầu tư Medlink (MEDLINK,JSC). Khi truy cập,
            sử dụng ứng dụng này, Bạn đã mặc nhiên đồng ý với các điều khoản và điều kiện đề ra ở đây. Do vậy đề nghị
            Bạn đọc và nghiên cứu kỹ trước khi sử dụng tiếp.
          </Text>
          <Text style={styles.p}>
            1.1 Chào mừng Bạn đến với ứng dụng Medlink ( gọi tắt là “ứng dụng”). Trước khi truy cập vào ứng dụng, vui
            lòng đọc kỹ các Điều Khoản Dịch Vụ dưới đây để hiểu rõ quyền lợi và nghĩa vụ hợp pháp của mình đối với Công
            ty Cổ Phần Đầu tư Medlink (sau đây được gọi riêng là Medlink, gọi chung là “chúng tôi”, “của chúng tôi”).
            Khi sử dụng ứng dụng, Bạn đã mặc nhiên chấp thuận các điều khoản và điều kiện sử dụng (sau đây gọi tắt là
            “Điều kiện Sử dụng”) được quy định dưới đây. Để biết được các sửa đổi mới nhất, Bạn nên thường xuyên kiểm
            tra lại “Điều kiện Sử dụng”. Medlink có quyền thay đổi, điều chỉnh, thêm hay bớt các nội dung của “Điều kiện
            Sử dụng” tại bất kỳ thời điểm nào. Nếu Bạn vẫn tiếp tục sử dụng Ứng dụng sau khi có các thay đổi như vậy thì
            có nghĩa là Bạn đã chấp thuận các thay đổi đó.
          </Text>
          <Text style={styles.p}>
            1.2 Medlink cung cấp dịch vụ nền tảng trực tuyến kết nối nhà thuốc với các công ty sản xuất/phân phối dược
            phẩm nhằm mang đến cơ hội tăng doanh thu cho các nhà thuốc và giúp các công ty sản xuất/phân phối dược phẩm
            giảm chi phí vận chuyển (gọi chung là “Người Dùng”, “Các Bên”). Thỏa thuận hợp tác giữa các bên được tạo lập
            trực tiếp giữa nhà thuốc và công ty sản xuất/phân phối dược phẩm. Các Bên liên quan đến giao dịch sẽ hoàn
            toàn chịu trách nhiệm với thỏa thuận hợp tác, danh mục hàng hóa, bảo đảm đơn hàng. Medlink không can thiệp
            vào giao dịch giữa các Người Dùng. Medlink không bảo đảm sự thành công của các giao dịch. Lưu ý, Medlink sẽ
            là bên trung gian quản lý tình trạng đơn hàng giữa nhà thuốc và công ty sản xuất/phân phối dược phẩm và
            không quản lý vấn đề chuyển phát.
          </Text>
          <Text style={styles.p}>
            1.3 Medlink bảo lưu quyền thay đổi, chỉnh sửa, tạm ngưng hoặc chấm dứt bất cứ bộ phận nào của Ứng dụng hoặc
            Dịch Vụ vào bất cứ thời điểm nào theo qui định pháp luật. Medlink không chịu trách nhiệm đối với việc phát
            hành các dịch vụ hoặc tính năng thử nghiệm chưa hoàn thiện hoặc không hoàn toàn giống với phiên bản cuối
            cùng. Medlink có quyền tự giới hạn một số tính năng hoặc phạm vi truy cập của người dùng tới một phần hoặc
            toàn bộ Ứng dụng hoặc Dịch Vụ của Medlink mà không cần thông báo hay chịu trách nhiệm.
          </Text>

          <Text style={styles.title}>2. BẢO MẬT</Text>
          <Text style={styles.p}>
            Medlink coi trọng việc bảo mật thông tin người dùng. Để bảo vệ quyền lợi người dùng, Medlink cung cấp Chính
            Sách Bảo Mật tại ứng dụng này để giải thích chi tiết các hoạt động bảo mật của Medlink. Vui lòng tham khảo
            Chính Sách Bảo Mật để biết cách thức Medlink thu thập và sử dụng thông tin liên quan đến tài khoản/hoạt động
            sử dụng Dịch Vụ của Người Dùng (“Thông Tin Người Dùng”). Điều Khoản Dịch Vụ này có liên quan mật thiết với
            Chính Sách Bảo Mật. Khi sử dụng Dịch Vụ hoặc đồng ý với Điều Khoản Dịch Vụ, Người dùng
          </Text>
          <Text style={styles.p}>
            a. Cho phép Medlink thu thập, sử dụng, công bố hoặc xử lý các nội dung hoặc dữ liệu nhà thuốc hoặc Thông Tin
            Người Dùng như được quy định trong Chính Sách Bảo Mật;
          </Text>
          <Text style={styles.p}>
            b. Đồng ý và công nhận rằng, trong phạm vi pháp luật có liên quan cho phép, các Thông Tin Người Dùng sẽ
            thuộc sở hữu chung của bạn và Medlink; và
          </Text>
          <Text style={styles.p}>
            c. Sẽ không, dù là trực tiếp hay gián tiếp, tiết lộ các Thông Tin Người Dùng cho bất kỳ bên thứ ba nào, hoặc
            bằng bất kỳ phương thức nào cho phép bất kỳ bên thứ ba nào được tiếp cận hoặc sử dụng Thông Tin Người Dùng
            của bạn.
          </Text>

          <Text style={styles.title}>3. GIỚI HẠN TRÁCH NHIỆM</Text>
          <Text style={styles.p}>
            3.1 Medlink trao cho Người Dùng quyền phù hợp để truy cập và sử dụng các Dịch Vụ theo các điều khoản và điều
            kiện được quy định trong Điều Khoản Dịch Vụ. Tất cả các nội dung, thương hiệu, nhãn hiệu dịch vụ, tên thương
            hiệu, logo và tài sản thuộc sản thuộc quyền sở hữu trí tuệ khác hiển thị trên Ứng dụng đều thuộc sở hữu của
            Medlink và bên thứ 3 trên Ứng dụng, nếu có. Bất kỳ đối tượng nào truy cập vào Ứng dụng đều không được trực
            tiếp hoặc gián tiếp cho phép sử dụng hoặc sao chép bất kỳ nội dung, thương hiệu, nhãn hiệu dịch vụ, tên
            thương hiệu, logo hay bất kỳ tài sản trí tuệ nào khác; bất kỳ đối tượng nào nào truy cập vào Ứng dụng đều
            không được yêu cầu quyền lợi, chức vụ hay lợi ích nào. Khi sử dụng dịch vụ, bạn đồng ý tuân thủ các luật lệ
            liên quan đến bản quyền, thương hiệu, nhãn hiệu dịch vụ hoặc bất cứ quy định nào bảo vệ Dịch Vụ, Nội Dung và
            Ứng dụng Medlink. Bạn không được phép sao chép, phát tán, tái bản, chuyển giao, trưng bày công khai, sửa
            đổi, bán, cho thuê hoặc tạo ra các sản phẩm phái sinh của bất cứ bộ phận nào thuộc Dịch Vụ, Nội Dung và Ứng
            dụng Melink. Bạn không được nhân bản, chỉnh sửa bất kỳ nội dung nào trên Ứng dụng Medlink, máy chủ hoặc trên
            các website khác mà chưa nhận được sự chấp thuận bằng văn bản của Medlink. Ngoài ra bạn cần cam kết không sử
            dụng bất kỳ robot, spider hay thiết bị tự động hoặc thủ công nào để điều khiển, sao chép các nội dung mà
            chưa nhận được sự đồng ý của Medlink (thỏa thuận này áp dụng cho các công cụ tìm kiếm cơ bản trên các
            website kết nối người dùng trực tiếp đến website đó).
          </Text>
          <Text style={styles.title}>4. PHẦN MỀM</Text>
          <Text style={styles.p}>
            Bất kỳ phần mềm nào được cung cấp bởi Medlink tới Người Dùng đều thuộc phạm vi điều chỉnh của Điều Khoản
            Dịch Vụ. Các phần mềm đều được cấp phép, không bán và Medlink bảo lưu mọi quyền đối với các phần mềm này.
            Bất kỳ lệnh, mã của bên thứ ba liên kết tới hoặc liên quan đến Dịch Vụ đều được cấp phép cho bạn bởi bên thứ
            ba, chủ sở hữu lệnh và mã đó.
          </Text>
          <Text style={styles.title}>5. TÀI KHOẢN VÀ BẢO MẬT</Text>
          <Text style={styles.p}>
            5.1 Để sử dụng ứng dụng Medlink, bạn cần tạo tài khoản trên phần mềm quản lý nhà thuốc online Medlink.
          </Text>
          <Text style={styles.p}>
            5.2 Bạn cam kết (a) giữ bí mật mật khẩu và chỉ sử dụng tên tài khoản và mật khẩu khi đăng nhập, (b) đăng
            xuất khỏi tài khoản trước khi rời khỏi Ứng dụng, và thông báo ngay lập tức với Medlink nếu phát hiện bất kỳ
            đăng nhập trái phép nào dưới tên và mật khẩu của bạn. Bạn phải hoàn toàn chịu trách nhiệm với mọi hoạt động
            dưới tên và tài khoản của bạn ngay cả khi những hoạt động đó không do bạn thực hiện. Medlink không chịu
            trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ việc sử dụng không hợp pháp mật khẩu hoặc từ việc
            không tuân thủ điều khoản này.
          </Text>
          <Text style={styles.p}>
            5.3 Bạn đồng ý rằng Medlink có quyền xóa tài khoản Người Dùng và tên truy cập của bạn ngay lập tức, hoặc gỡ
            bỏ hủy từ Ứng dụng bất kỳ Nội Dung nào liên quan đến tài khoản và tên truy cập của Người Dùng với bất kỳ lý
            do nào mà có hoặc không cần thông báo hay chịu trách nhiệm với Người Dùng hay bên thứ ba nào khác. Căn cứ
            xóa tài khoản/mã định danh người dùng bao gồm (a) tài khoản không hoạt động trong thời gian dài, (b) vi phạm
            câu chữ hoặc tinh thần của Điều Khoản Dịch Vụ, (c) có hành vi lửa đảo, quấy rối, xâm phạm, đe dọa hoặc lạm
            dụng (d) các hành vi gây hại tới người dùng khác, bên thứ ba hoặc các lợi ích kinh tế của Medlink. Việc sử
            dụng tài khoản cho các mục đích bất hợp phát, lừa đảo, quấy rối, xâm phạm, đe dọa hoặc lạm dụng có thể bị
            xem xét tố tụng lên các cơ quan chức năng mà không cần thông báo trước. Nếu bạn khiếu nại chống lại Medlink
            (vì bất kỳ nguyên nhân nào) hoặc bằng cách nào đó liên quan tới Medlink, Medlink có quyền xóa tài khoản của
            bạn mà có hoặc không cần thông báo.
          </Text>
          <Text style={styles.p}>
            5.4 Người Dùng có thể yêu cầu xóa tài khoản bằng cách thông báo với Medlink qua văn bản (có thể gửi email
            tới địa chỉ hotro@medlink.vn). Không phụ thuộc vào yêu cầu xóa tài khoản, Người Dùng buộc phải chịu trách
            nhiệm đối với bất kỳ giao dịch nào chưa hoàn thành (phát sinh trước hoặc sau khi tài khoản bị xóa) hay việc
            vận chuyển hàng hóa. Khi đó, theo Điều Khoản Dịch Vụ, Người Dùng phải liên hệ với Medlink sau khi đã nhanh
            chóng vận chuyển và hoàn tất các đơn hàng thành công, Medlink không có trách nhiệm và không chịu trách nhiệm
            đối với bất kỳ hư hỏng phát sinh từ hành động liên quan đến phần này. Medlink miễn trừ mọi khiếu nại của
            Người Dùng đối với những trường hợp này.
          </Text>
          <Text style={styles.p}>
            5.5 Bạn chỉ có thể sử dụng dịch vụ hoặc đăng ký tài khoản tại Medlink nếu bạn đáp ứng đủ các điều kiện để
            chấp nhận Điều Khoản Dịch Vụ này.
          </Text>
          <Text style={styles.title}>6. ĐIỀU KHOẢN SỬ DỤNG</Text>
          <Text style={styles.p}>
            6.1 Quyền được phép sử dụng Ứng dụng và Dịch Vụ Medlink có hiệu lực cho đến khi bị chấm dứt. Việc cấp phép
            này sẽ bị chấm dứt như đã đề cập trong Điều Khoản Dịch Vụ này hoặc nếu Người Dùng vi phạm bất cứ điều khoản
            hoặc điều kiện nào được quy định tại Điều Khoản Dịch Vụ này. Trong trường hợp đó, Medlink có thể hoặc không
            gửi thông báo đến cho Người Dùng khi dừng cấp phép.
          </Text>
          <Text style={styles.p}>
            6.2 Người Dùng không được phép: (a) Tải lên, đăng, chuyển giao hoặc công khai bất cứ nội dung nào trái pháp
            luật, có hại, đe dọa, lạm dụng, quấy rối, nói xấu, khiêu dâm, bôi nhọ, xâm phạm riêng tư người dùng khác,
            phân biệt chủng tộc, dân tộc hoặc bất kỳ hành vi gây khó chịu nào khác; (b) Vi phạm luật pháp, quyền lợi của
            bên thứ ba; (c) Gây tổn hại cho trẻ vị thành niên dưới bất kỳ hình thức nào; (d) Sử dụng dịch vụ để mạo danh
            bất kỳ nhà thuốc/ tổ chức nào, hoặc xuyên tạc nhà thuốc/ tổ chức; (e) Sửa đổi tiêu đề hoặc chỉnh sửa định
            dạng để che giấu nguồn gốc của bất kỳ nội dung nào của dịch vụ; (f) Gỡ bỏ bất kỳ thông tin độc quyền nào từ
            Ứng dụng; (g) Gây ra, chấp nhận, ủy quyền cho bất kỳ sửa đổi hoặc tạo ra các sản phẩm phái sinh từ các bản
            dịch của Dich Vụ mà không được sự cho phép của Medlink; (h) Sử dụng Dịch Vụ phục vụ lợi ích cho bên thứ ba
            hoặc bất kỳ hành vi nào không được chấp nhận trong điều khoản này; (i) Sử dụng Dịch Vụ cho mục đích lừa đảo.
            (j) Chỉnh sửa giá của bất kì sản phẩm nào hoặc can thiệp vào danh mục hàng hóa của người dùng khác. (k) Có
            hành vi phá hoại hệ thống xếp hạng hoặc ghi nhận phản hồi của Medlink; (l) Cố tình đảo ngược, tháo gỡ, hack
            các công cụ của Dịch Vụ (hoặc bất cứ hợp phần nào); phá bỏ hàng rào công nghệ mã hóa, hàng rào an ninh liên
            quan đến các Dịch Vụ của Medlink hoặc các thông tin được chuyển giao, xử lý, lưu giữ bởi Medlink. (m) Khai
            thác hoặc thu thập bất kỳ thông tin nào liên quan đến tài khoản Người Dùng; (n) Tải lên, đăng, gửi thư điện
            tử hoặc công khai bất kỳ nội dung nào không được cho phép dưới bất kỳ luật lệ hoặc quan hệ hợp đồng, ủy thác
            nào (thông tin nội bộ, thông tin độc quyền cần bảo mật hoặc tiết lộ quan hệ lao động mà không được cho
            phép); (o) Tải lên, đăng, gửi thư điện tử, chuyển giao hoặc công khai bất kỳ nội dung nào dẫn đến trường hợp
            vi phạm bằng sáng chế, thương hiệu, bí quyết kinh doanh, bản quyền hoặc bất cứ quyền lợi duy nhất của bất cứ
            bên nào; (p) Tải lên, đăng, gửi thư điện tử, chuyển giao hoặc công khai bất kỳ quảng cáo không được phép
            hoặc không hợp pháp nào, các tài liệu quảng cáo, “thư quấy rối”, “thư rác”, “chuỗi ký tự”, hoặc bất kỳ hình
            thức quảng cáo nào khác; (q) Tải lên, đăng, gửi thư điện tử, chuyển giao hoặc công khai bất cứ tài liệu chứa
            các vi-rút, trojan hoặc các mã máy tính, các tập tin hoặc các chương trình được thiết kế để gây cản trở, phá
            hỏng hoặc hạn chế các chức năng của phần cứng/phần mềm máy tính hoặc thiết bị viễn thông; (r) Làm gián đoạn
            các cuộc hội thoại, đẩy nhanh tốc độ màn hình hơn bình thường để soạn thảo hoặc thực hiện các thao tác gây
            ảnh hưởng tiêu cực đến khả năng tham gia giao dịch thực của người dùng, (s) Can thiệp, điều khiển hoặc làm
            gián đoạn dịch vụ, máy chủ, mạng lưới kết nối tới dịch vụ hoặc tới hoạt động sử dụng dịch vụ của người dùng
            hoặc không tuân thủ các yêu cầu, quy trình, chính sách và luật lệ của mạng lưới liên quan đến Ứng dụng
            Medlink; (t) Có hành vi hoặc tham gia trực tiếp/ gián tiếp phá hủy, vô hiệu hóa, làm quá tải, làm suy yếu
            Dịch Vụ, máy chủ hoặc mạng kết nối với Dịch Vụ; (u) Sử dụng Dịch Vụ để vi phạm pháp luật, quy chế, chỉ thị,
            hướng dẫn, chính sách của địa phương, quốc gia, quốc tế (có hoặc chưa có hiệu lực) một cách có chủ ý hoặc vô
            ý liên quan đến phòng chống rửa tiền hoặc phòng chống khủng bố; (v) Sử dụng Dịch vụ để vi phạm hoặc phá vỡ
            bất kỳ hình phạt hay lệnh cấm vận nào được quản lý hay thực thi bởi các cơ quan có liên quan. (w) Sử dụng
            Dịch Vụ để xâm hại tới quyền riêng tư của người khác, lén theo dõi hoặc quấy rối Người Dùng khác; (x) Xâm
            phạm các quyền của Medlink, bao gồm quyền sở hữu trí tuệ và danh tiếng gắn liền với nó; (y) Sử dụng Dịch vụ
            để thu thập hoặc lưu trữ dữ liệu nhà thuốc của Người Dùng khác có liên quan đến các hành vi và hoạt động bị
            cấm như đề cập bên trên; và/hoặc (z) Liệt kê các hàng hóa xâm phạm quyền tác giả, nhãn hiệu và các quyền sở
            hữu trí tuệ khác của các bên thứ ba và sử dụng các Dịch vụ theo các cách thức có thể xâm phạm quyền sở hữu
            trí tuệ của bên thứ ba.
          </Text>
          <Text style={styles.p}>
            6.3 Bạn xác nhận và chấp thuận rằng Medlink có thể truy cập, bảo lưu và tiết lộ bất kỳ thông tin tài khoản
            nào của bạn cũng như các nội dung được yêu cầu bởi luật pháp; tuân theo lệnh của tòa án, các cơ quan chức
            năng có thẩm quyền đối với Medlink; theo quan điểm của Medlink về việc thực hiện những sự bảo lưu và tiết lộ
            là cần thiết để: (a) tuân thủ luật pháp; (b) thực thi Điều Khoản Dịch Vụ; (c) phản hồi các khiếu nại về việc
            Nội Dung xâm phạm đến quyền lợi của bên thứ ba; (d) phản hồi các yêu cầu của Người Dùng liên quan đến chăm
            sóc khách hàng; hoặc (e) bảo vệ quyền lợi, tài sản hoặc an toàn của Medlink, Người Dùng và cộng đồng.
          </Text>
          <Text style={styles.title}>7. VI PHẠM ĐIỀU KHOẢN DỊCH VỤ</Text>
          <Text style={styles.p}>7.1 Việc vi phạm những quy định này có thể dẫn tới những hậu quả sau:</Text>
          <Text style={styles.p}>- Bị giới hạn việc nhận đơn hàng;</Text>
          <Text style={styles.p}>- Giới hạn quyền sử dụng tài khoản;</Text>
          <Text style={styles.p}>- Đình chỉ và chấm dứt quyền sử dụng tài khoản</Text>
          <Text style={styles.p}>- Cáo buộc hình sự;</Text>
          <Text style={styles.p}>
            - Áp dụng biện pháp dân sự bao gồm nhưng không giới hạn khiếu nại bồi thường thiệt hại hoặc áp dụng biện
            pháp khẩn cấp tạm thời.
          </Text>
          <Text style={styles.p}>
            7.2 Nếu bạn phát hiện Người Dùng có hành vi vi phạm Điều Khoản Dịch Vụ, vui lòng liên hệ qua email
            hotro@medlink.vn.
          </Text>
          <Text style={styles.title}>8. BÁO CÁO HÀNH VI XÂM PHẠM QUYỀN SỞ HỮU TRÍ TUỆ</Text>

          <Text style={styles.p}>
            8.1 Người Dùng là các nhà thuốc hoặc công ty sản xuất/phân phối độc lập và họ không có bất kỳ mối liên kết
            nào vơi Medlink dưới bất kỳ hình thức nào. Medlink cũng không phải là đại lý hay đại diện của Người Dùng và
            không sở hữu riêng bất kỳ hàng hóa nào được chào bán trên Medlink.
          </Text>
          <Text style={styles.p}>
            8.2 Nếu bạn là chủ sở hữu quyền sở hữu trí tuê (“chủ sở hữu quyền SHTT”) hoặc là đại diện được ủy quyền của
            bất kỳ chủ sở hữu quyền Sở hữu trí tuệ nào (“Đại diện”) và bạn tin rằng các quyền Sở hữu trí tuệ của bạn bị
            xâm phạm, vui lòng báo bằng văn bản tới Medlink qua địa chỉ email hotro@medlink.vn và cung cấp cho chúng tôi
            các tài liệu yêu cầu dưới đây để hỗ trợ việc giải quyết khiếu nại. Chúng tôi sẽ dành một khoảng thời gian
            hợp lý để xử lý các thông tin cung cấp. Medlink sẽ phản hồi khiếu nại của bạn trong thời gian sớm nhất có
            thể
          </Text>

          <Text style={styles.p}>
            8.3 Khiếu nại hành vi vi phạm quyền sở hữu trí tuệ cần được soạn thảo bằng văn bản và bao gồm đầy đủ những
            yêu cầu dưới đây: (a) Chữ ký điện tử hoặc chữ ký tay của người có thẩm quyền đại diện cho chủ sở hữu của các
            quyền lợi bản quyền được cho là bị vi phạm (b) bản mô tả về đối tượng đã được đăng ký bản quyền đó và chỉ rõ
            cách thức mà đối tượng đó đang bị vi phạm (c) mô tả chính xác tên của của đối tượng vi phạm và vị trí của
            đối tượng vi phạm trên Ứng dụng của chúng tôi; (d) thông tin đầy đủ để Medlink liên lạc với bạn gồm địa chỉ,
            số điện thoại, địa chỉ email (e) tuyên bố của bạn khẳng định việc sử dụng những tài liệu đó không được cho
            phép bởi người chủ sở hữu quyền tác giả, người đại diện của chủ sở hữu hoặc pháp luật (f) tuyên bố của bạn
            khẳng định sự chính xác của các thông tin cung cấp và cam kết rằng bạn là người được chủ sở hữu ủy quyền để
            thực hiện khiếu nại.
          </Text>

          <Text style={styles.title}>9. CHI PHÍ</Text>

          <Text style={styles.p}>
            9.1 Nếu không có thỏa thuận nào khác, Người Dùng không phải thanh toán bất kỳ chi phí nào khi sử dụng Ứng
            dụng Medlink.
          </Text>

          <Text style={styles.p}>
            9.2 Nếu có bất kỳ khoản nào phải trả, khoản phí đó đã bao gồm GST/VAT và những loại thuế khác. Medlink sẽ
            xuất biên lai hoặc hóa đơn tài chính cho khoản phí và khoản thuế do Người Dùng chi trả nếu có yêu cầu.
          </Text>

          <Text style={styles.title}>10. TRANH CHẤP</Text>

          <Text style={styles.p}>
            Medlink khuyến khích Người Dùng liên hệ với nhau khi có bất kì vấn đề nào phát sinh trong giao dịch. Medlink
            là nền tảng hỗ trợ giao dịch, do đó nhà thuốc và Công ty sản xuất/phân phối dược phẩm nên liên hệ trực tiếp
            với nhau để giải quyết bất kì phát sinh nào liên quan đến đơn hàng. Hoặc Người Dùng có thể khiếu nại lên cơ
            quan có thẩm quyền của địa phương để giải quyết tranh chấp phát sinh trong giao dịch.
          </Text>

          <Text style={styles.title}>11. PHẢN HỒI</Text>

          <Text style={styles.p}>
            Medlink luôn đón nhận những phản hồi từ phía Người Dùng để cải thiện chất lượng Dịch Vụ. Vui lòng xem thêm
            quy trình phản hồi dưới đây:
          </Text>

          <Text style={styles.p}>
            (i) Phản hồi cần được thực hiện bằng văn bản qua email hoặc sử dụng mẫu phản hồi có sẵn trên ứng dụng
          </Text>

          <Text style={styles.p}>(ii) Tất cả các phản hồi ẩn danh đều không được chấp nhận</Text>

          <Text style={styles.p}>
            (iii) Người Dùng bị tố cáo sẽ được thông báo đầy đủ và được tạo cơ hội cải thiện tình hình
          </Text>

          <Text style={styles.p}>(iv) Những phản hồi không rõ ràng và khiếm nhã sẽ không được chấp nhận</Text>

          <Text style={styles.title}>19. LOẠI TRỪ TRÁCH NHIỆM</Text>

          <Text style={styles.p}>
            19.1 Dịch vụ được cung cấp như sẵn có và không có bất kỳ sự đảm bảo nào, khiếu nại hoặc đại diện bởi Medlink
            về bất kỳ nội dung nào được cho là tuyên bố, ngụ ý hoặc nhấn mạnh đối với các dịch vụ, bao gồm nhưng không
            giới hạn bảo đảm về chất lượng, giao dịch mua bán, không vi phạm, và phù hợp với một mục đích cụ thể hoặc
            không có bất kỳ bảo đảm nào được tạo ra trong quá trình giao dịch và thực hiện việc mua bán hoặc sử dụng sản
            phẩm sau khi mua. ngoài các nội dung trên, Medlink không đảm bảo rằng, dịch vụ, ứng dụng hoặc các chức năng
            được tích hợp trong đó luôn có sẵn, có thể truy cập, không bị gián đoạn, an toàn, chính xác, hoàn thiện hoặc
            không bị lỗi; các lỗi phát sinh, nếu có, sẽ được khắc phục, hoặc ứng dụng/trang chủ sẽ tạo những chức năng
            an toàn với vi rút, trojan, ổ khóa phần mềm, bom hẹn giờ hoặc bất cứ mã, chương trình có hại nào khác.
          </Text>

          <Text style={styles.p}>
            19.2 Người dùng cần xác nhận rằng mọi rủi ro phát sinh ngoài việc sử dụng hoặc vận hành của ứng dụng và/hoặc
            dịch vụ của Medlink sẽ do người dùng chịu trách nhiệm theo quy định của pháp luật.
          </Text>

          <Text style={styles.p}>
            19.3 Medlink không kiểm soát và không đảm bảo hoặc chấp nhận bất kỳ trách nhiệm nào đối với (a) chất lượng,
            độ an toàn, tính pháp lý, phù hợp với mục đích, sự tồn tại của bất kỳ hàng hóa nào được đăng thông tin trên
            medlink hoặc (b) khả năng bán hàng của người bán hoặc khả năng mua hàng của người mua đối với mỗi sản phẩm
            chào bán. nếu có phát sinh tranh chấp giữa một hoặc nhiều người dùng, những người dùng đó sẽ đồng ý tự giải
            quyết mâu thuẫn trực tiếp với nhau, loại trừ Medlink và công ty liên kết của Medlink khỏi mọi khiếu nại, yêu
            cầu bồi thường, tổn thất phát sinh từ mâu thuẫn đó.
          </Text>

          <Text style={styles.title}>20. GIỚI HẠN VỀ TRÁCH NHIỆM PHÁP LÝ</Text>

          <Text style={styles.p}>
            20.1 Trong bất cứ trường hợp nào, sẽ không chịu trách nhiệm pháp lý đối với các hợp đồng, bảo đảm, lỗi sơ
            suất (chủ động, bị động hoặc quy gán), trách nhiệm sản phẩm, trách nhiệm pháp lý hoặc trách nhiệm khác; hoặc
            nguyên nhân khác liên quan đến luật pháp, vốn, hình ảnh hoặc tổn thất liên quan đến khai thác, lợi nhuận,
            danh thu, uy tín hoặc khoản dư tiết kiệm hoặc với bất kỳ hư hại gián tiếp, không lường trước, là hệ quả (gồm
            bất kỳ mất mát nào về dữ liệu, gián đoạn dịch vụ, máy tính, điện thoại hoặc các thiết bị di động khác) phát
            sinh ngoài việc sử dụng hoặc ngoài khả năng của trang Medlink và các dịch vụ gồm bất kỳ hưu hại phát sinh
            ngay cả khi Medlink được gợi ý phải chịu trách nhiệm.
          </Text>

          <Text style={styles.p}>
            20.2 Bạn thừa nhận và đồng ý rằng quyền duy nhất của bạn liên quan đến các sự cố hoặc sự không thỏa mãn với
            dịch vụ là yêu cầu chấm dứt sử dụng tài khoản hoặc dừng sử dụng dịch vụ.
          </Text>

          <Text style={styles.p}>
            20.3 Không có nội dung nào trong điều khoản sử dụng này sẽ giới hạn hoặc loại trừ bất kỳ trách nhiệm nào với
            Medlink đối với thương vong về người do lỗi sơ ý của Medlink, với các gian lận hoặc bất kỳ trách nhiệm nào
            khác mà không được hạn chế hoặc loại trừ theo qui định pháp luật.
          </Text>

          <Text style={styles.title}>21. LIÊN KẾT VỚI TRANG CỦA BÊN THỨ 3</Text>
          <Text style={styles.p}>
            Các đường dẫn trên Ứng dụng sẽ đưa Người Dùng rời khỏi Ứng dụng. Các đường link này chỉ được cung cấp với ý
            nghĩa xã giao, do đó việc truy cập vào đường link không đặt dưới sự kiểm soát của Medlink và bạn có thể gặp
            phải những rủi ro khi truy cập vào các đường link này. Medlink không chịu trách nhiệm đối với những nội dung
            lưu chứa bên trong đường dẫn bao gồm bất kỳ thay đổi, cập nhật của những trang này. Medlink cung cấp các
            đường dẫn này để tạo thuận lợi cho Người Dùng và việc chỉ dẫn đến những đường dẫn này không ám chỉ hay thể
            hiện rằng Medlink có hỗ trợ tài trợ đối với các trang chỉ dẫn và nội dung trong các trang chỉ dẫn đó.
          </Text>

          <Text style={styles.title}>22. ĐÓNG GÓP CỦA NGƯỜI DÙNG ĐỐI VỚI DỊCH VỤ</Text>

          <Text style={styles.p}>
            22.1 Khi gửi bất kỳ nội dung nào cho Medlink, bạn cam kết và bảo đảm rằng bạn đã có đầy đủ tất cả các quyền
            cần thiết hoặc đã được cho phép cấp các quyền dưới đây cho Medlink. Bạn cũng thừa nhận và đồng ý rằng bạn là
            người chịu trách nhiệm duy nhất đối với bất cứ nội dung gì bạn đăng tải hoặc tạo sẵn trên hoặc qua Dịch Vụ,
            bao gồm nhưng không giới hạn trách nhiệm đối với mức độ chính xác, độ tin cậy, tính nguyên gốc, tính phù hợp
            với pháp luật và các giới hạn pháp lý liên quan đến các Nội dung đóng góp. Tại đây, bạn cũng cấp cho Medlink
            và người kế thừa quyền sử dụng, sao chép, phân phối, xuất bản, chuyển giao, thay đổi, chỉnh sửa, phái sinh
            được thể hiện và thực hiện một cách công khai những nội dung đóng góp đó trên hoặc qua hoặc liên quan đến
            Dịch Vụ dưới bất kỳ phương tiện đại chúng hoặc kênh thông tin nào cho mục đích quảng bá hoặc phân phối lại
            một phần Dịch Vụ (hoặc bản phái sinh của nó). Quyền mà bạn cấp cho chúng tôi là không hủy ngang, mang tính
            toàn cầu, không độc quyền, miễn phí và có thể cấp quyền thứ cấp và chuyển giao quyền. Quyền mà bạn trao cho
            chúng tôi chỉ chấm dứt khi bạn hoặc Medlink loại bỏ nội dung đóng góp ra khỏi Dịch Vụ. Bạn hiểu rằng sự đóng
            góp của bạn có thể được chuyển giáp sang nhiều hệ thống khác nhau và được thay đổi để phù hợp và đáp ứng các
            yêu cầu về kỹ thuật.
          </Text>

          <Text style={styles.p}>
            22.2 Bất kỳ tài liệu, thông tin hoặc ý tưởng được đăng tải qua Medlink hoặc chuyển giao qua Medlink dưới bất
            kì hình thức nào sẽ không được bảo mật bởi Medlink và có thể được phổ biến, sử dụng bởi Medlink hoặc các
            chinh nhánh nhằm phát triển, sản xuất và quảng cáo sản phẩm mà không phải bồi thường, chịu trách nhiệm với
            Người Dùng. Khi gửi nội dung tới Medlink, bạn cần xác nhận và đồng ý rằng Medlink và/hoặc bên thứ 3 có thể
            độc lập phát triển các phần mềm, ứng dụng, giao dịch, sản phẩm, sửa chữa, củng cố tương tự giống với chức
            năng, mã, đặc tính của ý tưởng theo sự cho phép của bạn. Theo đó, bạn trao cho Medlink quyền không thu hồi,
            không bác bỏ, trên phạm vi quốc tế, miễn phí bản quyền, chuyển nhượng giấy phép để phát triển các sản phẩm,
            sao chép, phân phối, tái bản, chuyển đổi, sửa.
          </Text>

          <Text style={[styles.p, { textAlign: 'right', fontWeight: 'bold', marginTop: vw(10) }]}>Medlink,</Text>
        </View>
      </ScrollView>
    );
  }

  _renderSecurePolicy() {
    return (
      <ScrollView>
        <View style={{ padding: vw(15) }}>
          <Text style={styles.title}>1. GIỚI THIỆU</Text>
          <Text style={styles.p}>
            1.1 Ứng dụng Medlink được điều hành bởi Công ty Cổ Phần Đầu tư Medlink, các chi nhánh trực thuộc và các tổ
            chức liên quan (được gọi riêng là "Medlink", và gọi chung là "Chúng tôi", “của Chúng tôi” trong văn bản
            này). Medlink cam kết tôn trọng quyền riêng tư và những vấn đề nhà thuốc của tất cả Người Dùng trên ứng dụng
            Medlink ("Ứng dụng”) (Chúng tôi gọi chung Ứng dụng và các dịch vụ Chúng tôi cung cấp được mô tả trên Ứng
            dụng là “Dịch Vụ”). Chúng tôi nhận thức được tầm quan trọng của các dữ liệu nhà thuốc và dữ liệu nhà thuốc
            mà bạn đã giao phó cho Chúng tôi và tin rằng trách nhiệm của Chúng tôi là quản lý đúng cách, bảo vệ và xử lý
            dữ liệu nhà thuốc của bạn. Chính Sách Bảo Mật này (gọi tắt là "Chính Sách Bảo Mật" hay "Chính Sách") được
            tạo ra nhằm cung cấp các thông tin tổng quát về việc Chúng tôi sẽ thu thập, sử dụng, tiết lộ hoặc xử lý các
            dữ liệu nhà thuốc mà bạn đã cung cấp cho Chúng tôi như thế nào, cho dù ở hiện tại hay trong tương lai; cũng
            như cách mà Chúng tôi sẽ hỗ trợ bạn trước khi đưa ra bất cứ quyết định nào liên quan đến việc cung cấp dữ
            liệu nhà thuốc của bạn cho Chúng tôi. Xin vui lòng đọc Chính Sách Bảo Mật một cách cẩn thận. Nếu bạn có bất
            kỳ câu hỏi liên quan đến các thông tin này hoặc thực tiễn bảo mật của Chúng tôi, xin vui lòng xem phần "Thắc
            mắc? Liên hệ với Chúng tôi" ở phần cuối của Chính Sách Bảo Mật này.
          </Text>

          <Text style={styles.p}>
            1.2 Bằng cách sử dụng Dịch Vụ, đăng ký tài khoản với Chúng tôi, ghé thăm Ứng dụng của Chúng tôi, bạn đã thừa
            nhận và đồng ý các yêu cầu, và/hoặc các Chính Sách, thực tiễn áp dụng nêu trong Chính Sách Bảo Mật này, và
            bạn đồng ý với Chúng tôi về việc thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu nhà thuốc của bạn theo
            cách được mô tả trong tài liệu này. NẾU BẠN KHÔNG ĐỒNG Ý VỚI CHÍNH SÁCH BẢO MẬT NÀY, VUI LÒNG KHÔNG SỬ DỤNG
            DỊCH VỤ CỦA CHÚNG TÔI. Nếu Chúng tôi thay đổi Chính Sách Bảo Mật, Chúng tôi sẽ cập nhật thay đổi hoặc sửa
            đổi đó trên Ứng dụng của Chúng tôi. Chúng tôi bảo lưu quyền sửa đổi Chính Sách Bảo Mật này vào bất cứ lúc
            nào.
          </Text>
          <Text style={styles.title}>2. MEDLINK THU THẬP NHỮNG THÔNG TIN GÌ?</Text>
          <Text style={styles.p}>
            2.1 "Dữ liệu nhà thuốc" được định nghĩa là dữ liệu, dù đúng hay sai, về một nhà thuốc - người mà có thể được
            xác định danh tính từ dữ liệu đó, hoặc từ dữ liệu và các thông tin khác mà một tổ chức có quyền hoặc có thể
            truy cập. Ví dụ thường gặp của dữ liệu nhà thuốc có thể bao gồm: tên nhà thuốc, số đăng ký kinh doanh và
            thông tin liên lạc.
          </Text>
          <Text style={styles.p}>
            Lưu ý: Thông tin bạn cung cấp cần phải chính xác, vì nó liên quan đến việc vận chuyển của hàng hóa, thanh
            toán hoặc tích lũy điểm thưởng từ các công ty sản xuất/phân phối dược phẩm.
          </Text>
          <Text style={styles.p}>2.2 Chúng tôi sẽ/có thể sẽ thu thập thông tin nhà thuốc về bạn:</Text>
          <Text style={styles.p}>
            (a) Khi bạn đăng ký và/hoặc sử dụng dịch vụ hoặc Ứng dụng của Chúng tôi, hoặc mở một tài khoản với Chúng
            tôi;
          </Text>
          <Text style={styles.p}>
            (b) Khi bạn gửi bất kỳ biểu mẫu nào, bao gồm nhưng không giới hạn đơn đăng ký hoặc các mẫu đơn khác liên
            quan đến bất kỳ sản phẩm và dịch vụ của Chúng tôi, cho dù trực tuyến hoặc bằng một hình thức chuyển phát
            khác;
          </Text>
          <Text style={styles.p}>
            (c) Khi bạn đồng ý bất kỳ thỏa thuận nào hoặc cung cấp cho Chúng tôi tài liệu hoặc thông tin liên quan đến
            tương tác giữa bạn với Chúng tôi, hoặc khi bạn sử dụng các sản phẩm và dịch vụ của Chúng tôi;
          </Text>
          <Text style={styles.p}>
            (d) Khi bạn tương tác với Chúng tôi, chẳng hạn như thông qua các cuộc gọi điện thoại (có thể được ghi âm
            lại), thư từ, fax, gặp trực tiếp, thông qua phương tiện truyền thông trên nền tảng mạng xã hội và thư điện
            tử;
          </Text>
          <Text style={styles.p}>
            (e) Khi bạn sử dụng dịch vụ điện tử của Chúng tôi, hoặc tương tác với Chúng tôi qua ứng dụng, hoặc sử dụng
            các dịch vụ trên Ứng dụng của Chúng tôi. Điều này bao gồm thông qua các tập tin Cookie mà Chúng tôi có thể
            triển khai khi bạn tương tác với các ứng dụng hoặc Ứng dụng của Chúng tôi;
          </Text>
          <Text style={styles.p}>(f) Khi bạn thực hiện các giao dịch thông qua dịch vụ của Chúng tôi;</Text>
          <Text style={styles.p}>(g) Khi bạn cung cấp cho Chúng tôi thông tin phản hồi hoặc khiếu nại;</Text>
          <Text style={styles.p}>(h) Khi bạn tham gia vào một cuộc thi do Chúng tôi tổ chức;</Text>
          <Text style={styles.p}>(i) Khi bạn gửi dữ liệu nhà thuốc của bạn cho Chúng tôi vì bất cứ lý do nào;</Text>
          <Text style={styles.p}>
            Trên đây chỉ là một số trường hợp phổ biến mà Chúng tôi thu thập dữ liệu nhà thuốc của bạn, không phản ánh
            hết toàn bộ các trường hợp mà Chúng tôi sẽ thu thập dữ liệu nhà thuốc của bạn.
          </Text>
          <Text style={styles.p}>
            2.3 Khi bạn truy cập, sử dụng hoặc tương tác với ứng dụng di động hoặc Ứng dụng của Chúng tôi, Chúng tôi có
            thể thu thập một số thông tin nhất định bằng phương tiện tự động hoặc thụ động bằng cách sử dụng một loạt
            các công nghệ, loại có thể tải về điện thoại của bạn và có thể thiết lập/sửa đổi cài đặt trên thiết bị của
            bạn. Thông tin Chúng tôi thu thập có thể bao gồm các địa chỉ giao thức Internet (IP), hệ điều hành của thiết
            bị máy tính/điện thoại di động và loại trình duyệt, loại thiết bị di động, đặc điểm của thiết bị di động đó,
            mã định danh thiết bị duy nhất (UDID) hoặc mã định danh thiết bị di động (MEID) cho thiết bị của bạn, địa
            chỉ của một Ứng dụng giới thiệu (nếu có), lịch sử truy cập vào Ứng dụng và các ứng dụng di động của Chúng
            tôi. Chúng tôi có thể thu thập, sử dụng, tiết lộ và/hoặc xử lý thông tin này cho các Mục Đích (được định
            nghĩa dưới đây).
          </Text>
          <Text style={styles.p}>
            2.4 Ứng dụng di động của Chúng tôi có thể thu thập thông tin chính xác về vị trí của thiết bị di động của
            bạn bằng cách sử dụng các công nghệ như GPS, Wi-Fi, v.v.. Chúng tôi thu thập, sử dụng, tiết lộ và/hoặc xử lý
            thông tin này cho một hoặc nhiều Mục Đích bao gồm cả các dịch vụ dựa trên địa điểm do bạn yêu cầu hoặc cung
            cấp cho bạn những thông tin liên quan tới địa điểm đó hoặc cho phép bạn chia sẻ vị trí của bạn cho Người
            Dùng khác. Đối với hầu hết các thiết bị di động, bạn có thể rút lại sự cho phép lấy thông tin vị trí của bạn
            thông qua mục cài đặt điện thoại. Nếu bạn có thắc mắc về cách để vô hiệu hóa các dịch vụ xác định vị trí
            trên thiết bị di động của bạn, xin vui lòng liên hệ với nhà cung cấp dịch vụ điện thoại di động hoặc các nhà
            sản xuất thiết bị.
          </Text>
          <Text style={styles.p}>2.5 Dữ liệu nhà thuốc được thu thập bao gồm, nhưng không giới hạn:</Text>
          <Text style={styles.p}>Tên nhà thuốc</Text>
          <Text style={styles.p}>Họ và tên chủ nhà thuốc</Text>
          <Text style={styles.p}>Địa chỉ email</Text>
          <Text style={styles.p}>Địa chỉ nhà thuốc</Text>
          <Text style={styles.p}>Số điện thoại di động</Text>
          <Text style={styles.p}>
            Bất kỳ thông tin nào khác về Người Dùng khi Người Dùng đăng nhập và sử dụng dịch vụ hoặc Ứng dụng của Chúng
            tôi, thời điểm Người Dùng sử dụng các dịch vụ hoặc Ứng dụng của Chúng tôi, cũng như các thông tin liên quan
            đến cách Người Dùng sử dụng dịch vụ hoặc Ứng dụng của Chúng tôi· Số liệu tổng hợp về lịch sử thao tác của
            Người Dùng
          </Text>
          <Text style={styles.p}>
            2.6 Nếu bạn không muốn Chúng tôi thu thập các thông tin nói trên hay dữ liệu nhà thuốc, bạn có thể chọn
            không tham gia bất cứ lúc nào bằng cách thông báo đến Bộ phận Chăm sóc khách hàng của Chúng tôi.
          </Text>
          <Text style={styles.p}>
            Lưu ý: Khi bạn không tham gia hoặc không còn đồng ý với các điều khoản thu thập thông tin nhà thuốc của
            Chúng tôi, việc sử dụng Dịch vụ của bạn có thể sẽ bị ảnh hưởng. Ví dụ như dịch vụ xác định vị trí sẽ không
            hoạt động nếu bạn không cho phép ứng dụng truy cập vị trí của bạn.
          </Text>
          <Text style={styles.title}>3. CÀI ĐẶT TÀI KHOẢN</Text>
          <Text style={styles.p}>
            Một số chức năng nhất định của Dịch Vụ yêu cầu bạn sẽ phải tạo một tài khoản Người Dùng và gửi dữ liệu nhà
            thuốc. Khi bạn đăng ký và tạo một tài khoản mới, Chúng tôi yêu cầu bạn cung cấp cho Chúng tôi những thông
            tin như tên tài khoản, địa chỉ email, và tên Người Dùng mà bạn chọn. Chúng tôi cũng yêu cầu một số thông tin
            nhà thuốc như số đăng ký kinh doanh, tên nhà thuốc và số điện thoại liên hệ. Sau khi kích hoạt tài khoản,
            bạn sẽ chọn một tên Người Dùng và mật khẩu. Tên Người Dùng và mật khẩu của bạn sẽ được sử dụng để bạn có thể
            truy cập một cách an toàn và duy trì tài khoản của bạn.
          </Text>
          <Text style={styles.title}>4. XEM, TẢI NỘI DUNG VÀ QUẢNG CÁO</Text>
          <Text style={styles.p}>
            Giống như khi duyệt web bằng trình duyệt, khi bạn xem nội dung quảng cáo, truy cập các phần mềm khác trên
            Ứng dụng hoặc thông qua các dịch vụ của Chúng tôi , hầu hết các thông tin sẽ được gửi cho Chúng tôi (bao gồm
            địa chỉ IP, hệ điều hành...); tuy nhiên, thay vì số lượt truy cập, máy tính của bạn sẽ gửi cho Chúng tôi
            thông tin về nội dung, quảng cáo đã xem và/hoặc phần mềm được cài đặt bởi Ứng dụng và Dịch vụ của Chúng tôi.
          </Text>
          <Text style={styles.title}>5. CỘNG ĐỒNG & HỖ TRỢ</Text>
          <Text style={styles.p}>
            5.1 Chúng tôi cung cấp dịch vụ hỗ trợ khách hàng qua email, tin nhắn SMS và các hình thức tương tác online
            khác (Viber, Zalo, Messenger,…). Để hỗ trợ khách hàng, Chúng tôi sẽ yêu cầu khách hàng cung cấp địa chỉ
            email và số điện thoại di động. Ngoài ra, Chúng tôi không yêu cầu bất kỳ dữ liệu nhà thuốc nào khác thì mới
            cung cấp dịch vụ hỗ trợ khách hàng. Chúng tôi chỉ sử dụng thông tin nhận được khi khách hàng yêu cầu hỗ trợ,
            trong đó bao gồm địa chỉ email để hỗ trợ khách hàng và Chúng tôi sẽ không chuyển hoặc chia sẻ thông tin này
            với bất kỳ bên thứ ba nào khác.
          </Text>
          <Text style={styles.p}>
            5.2 Bạn cũng có thể gửi câu hỏi tới Đội ngũ hỗ trợ khách hàng của Medlink qua tính năng “Hỗ trợ” (Chat) của
            Chúng tôi; và khi làm như vậy, Chúng tôi lưu trữ thông tin như ID Người Dùng, danh sách liên lạc và trạng
            thái tin nhắn của bạn. Ngoài ra, các dịch vụ tương tự trong tương lai có thể yêu cầu Chúng tôi lưu trữ ID
            Người Dùng và mật khẩu của bạn.
          </Text>
          <Text style={styles.title}>6. KHẢO SÁT NGƯỜI DÙNG</Text>
          <Text style={styles.p}>
            Vào 1 thời điểm nào đó, Chúng tôi sẽ yêu cầu thông tin từ phía Người Dùng thông qua việc khảo sát. Việc tham
            gia vào các cuộc khảo sát là hoàn toàn tự nguyện, do đó bạn có thể lựa chọn cung cấp thông tin của bạn cho
            Chúng tôi hay không. Thông tin yêu cầu có thể bao gồm thông tin liên lạc (như địa chỉ email của bạn), và các
            thông tin nhà thuốc (như sở thích hay độ tuổi). Thông tin khảo sát sẽ được sử dụng cho Mục Đích khảo sát và
            cải thiện việc sử dụng Dịch vụ và sẽ không được chuyển giao cho bên thứ ba.
          </Text>
          <Text style={styles.title}>7. CHÚNG TÔI SỬ DỤNG THÔNG TIN BẠN CUNG CẤP NHƯ THẾ NÀO?</Text>
          <Text style={styles.p}>
            7.1 Chúng tôi có thể thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu nhà thuốc của bạn cho một hoặc nhiều
            hơn các Mục Đích sau đây:
          </Text>
          <Text style={styles.p}>(a) Để xem xét và/hoặc xử lý yêu cầu/giao dịch của bạn với Chúng tôi;</Text>
          <Text style={styles.p}>
            (b) Để quản lý, vận hành, cung cấp và/hoặc quản trị việc sử dụng và/hoặc truy cập vào Dịch Vụ hay Ứng dụng
            của Chúng tôi, cũng như tài khoản Người Dùng của bạn và mối quan hệ với Chúng tôi;
          </Text>
          <Text style={styles.p}>
            (c) Để quản lý, vận hành và cung cấp cho bạn cũng như tạo điều kiện cho việc cung cấp các Dịch Vụ của Chúng
            tôi, bao gồm ghi nhớ sở thích của bạn;
          </Text>
          <Text style={styles.p}>
            (d) Cải thiện trải nghiệm của bạn khi sử dụng Dịch Vụ bằng cách hiển thị nội dung theo mong muốn và sở thích
            của bạn, cung cấp một phương pháp nhanh hơn để bạn có thể truy cập vào tài khoản và gửi thông tin cho Chúng
            tôi, cho phép Chúng tôi liên lạc với bạn nếu cần thiết;
          </Text>
          <Text style={styles.p}>
            (e) Để tiếp nhận, xử lý, thương lượng hoặc hoàn thành một giao dịch và/hoặc để đáp ứng yêu cầu của bạn về
            sản phẩm và dịch vụ nhất định và thông báo cho bạn về những vấn đề dịch vụ và các hoạt động bất thường của
            tài khoản;
          </Text>
          <Text style={styles.p}>
            (f) Để thực thi Điều khoản Dịch vụ của Chúng tôi hoặc bất kỳ thỏa thuận cấp phép Người Dùng cuối nào được áp
            dụng;
          </Text>
          <Text style={styles.p}>
            (g) Để bảo vệ an toàn nhà thuốc, các quyền, tài sản hoặc sự an toàn của người khác;
          </Text>
          <Text style={styles.p}>(h) Để xác định hoặc thẩm tra;</Text>
          <Text style={styles.p}>
            (i) Để duy trì và quản trị bất kỳ bản cập nhật phần mềm và/hoặc các bản cập nhật khác có thể hỗ trợ được yêu
            cầu theo thời gian để đảm bảo Dịch vụ của Chúng tôi vận hành trơn tru;
          </Text>
          <Text style={styles.p}>
            (j) Xử lý hoặc tiến hành dịch vụ chăm sóc khách hàng, cung cấp các hướng dẫn cho bạn, tiếp nhận hoặc phản
            hồi bất cứ yêu cầu nào được đưa ra bởi (hoặc có ý định được đưa ra bởi) bạn;
          </Text>
          <Text style={styles.p}>
            (k) Để liên hệ với bạn qua điện thoại, tin nhắn và/hoặc fax, thư điện tử và/hoặc thư bưu chính, hoặc các
            phương tiện khác để duy trì mối liên hệ của bạn với Dịch vụ của Chúng tôi. Bạn hiểu và thừa nhận rằng khi
            Chúng tôi liên hệ với bạn qua thư từ bưu chính, một số thông tin nhà thuốc của bạn như họ tên, địa chỉ nhận
            sẽ được tiết lộ trên bao bì thư.
          </Text>
          <Text style={styles.p}>
            (l) Để thông báo cho bạn khi tài khoản khác đã gửi cho bạn một tin nhắn hoặc đăng một bình luận cho bạn trên
            web;
          </Text>
          <Text style={styles.p}>
            (m) Để tiến hành nghiên cứu, phân tích và phát triển Dịch Vụ (bao gồm phân tích dữ liệu, làm khảo sát, xây
            dựng và/hoặc phát triển sản phẩm và dịch vụ), để phân tích hành vi Người Dùng nhằm Mục Đích cải thiện Dịch
            Vụ hoặc sản phẩm của Chúng tôi và/hoặc để cải thiện trải nghiệm của Người Dùng;
          </Text>
          <Text style={styles.p}>
            (n) Để cho phép quảng cáo, kiểm toán và các cuộc khảo sát khác nhằm xác định quy mô và thành phần đối tượng
            mục tiêu của bạn, và hiểu sở thích của họ với các Dịch vụ của Medlink;
          </Text>
          <Text style={styles.p}>
            (o) Dành cho Mục Đích tiếp thị, Chúng tôi sẽ gửi thông tin cho bạn theo các phương tiện liên lạc khác nhau
            như thư bưu chính, thư điện tử, dịch vụ dựa trên vị trí, thông tin khuyến mại và các tài liệu liên quan đến
            các sản phẩm và/hoặc dịch vụ (bao gồm cả các sản phẩm và/hoặc dịch vụ của các bên thứ ba mà Medlink cộng tác
            hay làm việc với) mà Medlink (và/hoặc các chi nhánh trực thuộc hoặc tổ chức liên quan) đang bán, tiếp thị
            hay quảng bá, cho dù sản phẩm hay dịch vụ đó đang tồn tại hoặc sẽ được tạo ra trong tương lai. Chúng tôi sẽ
            không gửi tiếp thị hoặc các thông tin khuyến mại cho bạn qua cuộc gọi, tin nhắn SMS/MMS hoặc fax, trừ khi
            điều đó không vi phạm các quy định pháp luật hoặc trước đó Chúng tôi đã nhận được sự đồng ý một cách rõ ràng
            từ phía bạn;
          </Text>
          <Text style={styles.p}>
            (p) Để sử dụng vào các vụ việc tố tụng hoặc để tuân thủ hoặc đáp ứng quy định pháp luật hoặc thực hiện theo
            yêu cầu của chính quyền hoặc quy định của bất kỳ cơ quan thẩm quyền có liên quan, trong đó có bao gồm việc
            công bố thông tin theo yêu cầu của pháp luật mà Medlink hoặc chi nhánh, công ty có liên quan với Medlink cam
            kết ràng buộc;
          </Text>
          <Text style={styles.p}>
            (q) Để thu thập số liệu thống kê và nghiên cứu báo cáo nội bộ theo luật định và/hoặc yêu cầu lưu giữ hồ sơ;
          </Text>
          <Text style={styles.p}>
            (r) Để thực hiện các hoạt động sàng lọc nội dung (bao gồm kiểm tra lý lịch Người Dùng) theo quy định của
            pháp luật và quy định của Medlink;
          </Text>
          <Text style={styles.p}>(s) Để kiểm toán Dịch Vụ hoặc hoạt động kinh doanh của Medlink;</Text>
          <Text style={styles.p}>
            (t) Để ngăn ngừa hoặc điều tra mọi gian lận, hoạt động trái pháp luật, thiếu sót hay hành vi sai trái, cho
            dù có liên quan đến việc bạn sử dụng Dịch vụ của Chúng tôi hoặc bất kỳ vấn đề nào khác phát sinh từ mối liên
            hệ của bạn với Chúng tôi, dù có hoặc không có bất kỳ nghi ngờ nào về các hành vi nói trên;
          </Text>
          <Text style={styles.p}>
            (u) Để lưu trữ, sao lưu, khôi phục (dù là để khắc phục vấn đề hoặc không) dữ liệu nhà thuốc của bạn, cho dù
            trong hay ngoài Việt Nam;
          </Text>
          <Text style={styles.p}>
            (v) Để xử lý hoặc để thuận tiện cho các giao dịch liên quan đến tài sản kinh doanh mà Medlink là một bên
            tham gia hoặc có liên quan đến chi nhánh trực thuộc hoặc tổ chức có liên quan với tư cách là bên tham gia
            hoặc liên quan đến Medlink và/hoặc một hoặc nhiều chi nhánh/tổ chức liên quan của Medlink với tư cách là các
            bên tham gia và có thể sẽ có thêm một bên tham gia là một tổ chức thứ ba. “Giao dịch tài sản kinh doanh”
            được hiểu là các giao dịch mua bán, cho thuê, sáp nhập, hợp nhất hoặc mua lại một tổ chức/một phần của một
            tổ chức hoặc bất cứ tài sản nào của tổ chức đó;
          </Text>
          <Text style={styles.p}>
            (w) Bất kỳ Mục Đích nào khác mà Chúng tôi thông báo cho bạn tại thời điểm yêu cầu có sự đồng thuận của bạn.
            (gọi chung là “Mục Đích”);
          </Text>
          <Text style={styles.p}>
            7.2 Một số Mục Đích thu thập, sử dụng, tiết lộ hoặc xử lý dữ liệu nhà thuốc còn tùy thuộc vào hoàn cảnh tại
            thời điểm thu thập, nên sẽ không xuất hiện trong danh sách trên. Tuy nhiên, Chúng tôi sẽ thông báo cho bạn
            về những Mục Đích đó tại thời điểm hỏi xin sự đồng ý của bạn, trừ khi việc xử lý dữ liệu nhà thuốc mà không
            cần sự đồng ý của chủ sở hữu theo quy định pháp luật.
          </Text>
          <Text style={styles.title}>8. CHIA SẺ THÔNG TIN TỪ DỊCH VỤ CỦA CHÚNG TÔI</Text>
          <Text style={styles.p}>
            Dịch vụ của Chúng tôi cho phép Người Dùng chia sẻ thông tin nhà thuốc với Người Dùng khác để tiến hành giao
            dịch mà không cần sự can thiệp của Medlink. Trong mỗi giao dịch cụ thể, Người Dùng có thể tiếp cận với thông
            tin tài khoản của Người Dùng khác như tên, ID tài khoản, địa chỉ email hoặc các thông tin liên hệ. Trong
            những trường hợp đó, Người Dùng sở hữu thông tin nhà thuốc của Người Dùng khác (Bên Nhận) cần phải (i) tuân
            thủ mọi điều luật về bảo vệ dữ liệu nhà thuốc; (ii) cho phép Người Dùng kia (Bên Tiết Lộ) tự xóa thông tin
            của mình ra khỏi cơ sở dữ liệu của Bên Nhận.
          </Text>
          <Text style={styles.title}>9. MEDLINK BẢO VỆ THÔNG TIN NGƯỜI DÙNG NHƯ THẾ NÀO?</Text>
          <Text style={styles.p}>
            Chúng tôi thực hiện một loạt các biện pháp an ninh để đảm bảo sự an toàn của dữ liệu nhà thuốc của bạn trên
            hệ thống của Chúng tôi. Dữ liệu Người Dùng được lưu trữ đằng sau mạng lưới bảo đảm và chỉ có thể truy cập
            bởi một số nhân viên có quyền truy cập đặc biệt tới hệ thống. Chúng tôi sẽ giữ lại dữ liệu nhà thuốc theo
            quy định pháp luật hiện hành. Tuy nhiên, Chúng tôi sẽ phá hủy hoặc ẩn danh hóa dữ liệu nhà thuốc của bạn
            ngay khi phát sinh điều kiện hợp lý để giả định rằng (i) Mục Đích mà dữ liệu nhà thuốc được thu thập không
            còn là Mục Đích ban đầu; và (ii) việc lưu giữ là không còn cần thiết cho bất kỳ Mục Đích pháp lý, kinh
            doanh. Nếu bạn ngừng sử dụng các Ứng dụng, hoặc cho phép bạn sử dụng các Ứng dụng và/hoặc các Dịch Vụ bị
            chấm dứt, Chúng tôi có thể tiếp tục lưu trữ, sử dụng và/hoặc tiết lộ dữ liệu nhà thuốc của bạn phù hợp với
            Chính Sách Bảo Mật và nghĩa vụ của Chúng tôi theo quy định. Tùy thuộc vào luật áp dụng, Chúng tôi có thể xử
            lý dữ liệu nhà thuốc của bạn một cách an toàn mà không cần báo trước cho bạn.
          </Text>
          <Text style={styles.title}>10. MEDLINK CÓ TIẾT LỘ THÔNG TIN NHÀ THUỐC CỦA BẠN RA BÊN NGOÀI KHÔNG?</Text>
          <Text style={styles.p}>
            10.1 Trong hoạt động kinh doanh của Chúng tôi, Chúng tôi sẽ/có thể cần phải tiết lộ dữ liệu nhà thuốc của
            bạn cho bên thứ ba là các bên cung cấp dịch vụ cho Chúng tôi. Chúng tôi, đại lý và/hoặc các chi nhánh của
            Chúng tôi hoặc các công ty liên quan, và/hoặc các bên thứ ba khác, cho dù các Ứng dụng bên đó đặt tại đâu,
            cho một hoặc nhiều hơn các Mục Đích nêu trên. Các nhà cung cấp dịch vụ, đại lý và/hoặc các chi nhánh hoặc
            công ty liên quan và/hoặc các bên thứ ba khác đó sẽ được thay mặt Chúng tôi hoặc bằng cách khác, xử lý dữ
            liệu nhà thuốc của bạn cho một hoặc nhiều hơn các Mục Đích nêu trên. Các bên thứ ba đó bao gồm:
          </Text>
          <Text style={styles.p}>(a) Các công ty con của Chúng tôi, các chi nhánh và các công ty liên quan;</Text>
          <Text style={styles.p}>
            (b) Nhà thầu, đại lý, nhà cung cấp dịch vụ và các bên thứ ba khác mà Chúng tôi sử dụng để hỗ trợ hoạt động
            kinh doanh của Chúng tôi, bao gồm nhưng không giới hạn những đơn vị cung cấp dịch vụ quản trị hoặc các dịch
            vụ khác như các công ty bưu chính, các công ty viễn thông, các công ty công nghệ thông tin và các trung tâm
            dữ liệu;
          </Text>
          <Text style={styles.p}>
            (c) Một người mua hoặc người thừa kế khác trong trường hợp sáp nhập, thoái vốn, tái cơ cấu, tổ chức lại,
            giải thể hoặc bán hoặc chuyển nhượng một phần hoặc toàn bộ tài sản Medlink, cho dù là một hoạt động liên tục
            hoặc là một phần của phá sản, thanh lý, thủ tục tương tự, trong đó dữ liệu nhà thuốc của bạn là một trong
            những tài sản được chuyển giao; hoặc để một đối tác trong một giao dịch tài sản doanh nghiệp mà Medlink hoặc
            chi nhánh của nó hoặc các công ty có liên quan tham gia;
          </Text>
          <Text style={styles.p}>
            (d) Bên thứ ba mà Chúng tôi tiết lộ thông tin dành cho một hoặc nhiều hơn các Mục Đích và các bên thứ ba đó
            sẽ lần lượt được thu thập và xử lý dữ liệu nhà thuốc của bạn cho một hoặc nhiều hơn các Mục Đích trên.
          </Text>
          <Text style={styles.p}>
            10.2 Ngoài các nội dung trên, việc chia sẻ thông tin này có thể là do yêu cầu về việc chia sẻ thông tin mang
            tính thống kê và nhân khẩu học về Người Dùng của Chúng tôi và việc sử dụng Dịch Vụ của họ với các nhà cung
            cấp dịch vụ quảng cáo và lập trình. Điều này sẽ không bao gồm bất cứ điều gì mà có thể được sử dụng để nhận
            dạng bạn một cách đặc biệt hoặc để phát hiện các thông tin nhà thuốc về bạn.
          </Text>
          <Text style={styles.p}>
            10.3 Để tránh sự nghi ngờ, trong trường hợp pháp luật bảo vệ dữ liệu nhà thuốc hoặc các điều luật khác cho
            phép một tổ chức như Chúng tôi thu thập, sử dụng hoặc tiết lộ dữ liệu nhà thuốc của bạn mà không cần sự đồng
            ý của bạn, thì sự cho phép đó vẫn tiếp tục được áp dụng.
          </Text>
          <Text style={styles.p}>
            10.4 Chính Sách Bảo Mật này không phải là một lời hứa rằng dữ liệu nhà thuốc của bạn sẽ không bao giờ được
            tiết lộ, ngoại trừ như được mô tả trong Chính Sách Bảo Mật này. Ví dụ, các bên thứ ba bất hợp pháp có thể
            chặn truy cập dữ liệu nhà thuốc chuyển đến hoặc được chứa trên Ứng dụng, công nghệ có thể không hoạt động
            hoặc hoạt động không như dự kiến, hoặc một người nào đó có thể truy cập, lạm dụng hoặc sử dụng thông tin sai
            cách mà không phải do lỗi của Chúng tôi. Chúng tôi sẽ luôn triển khai các biện pháp an ninh hợp lý để bảo vệ
            dữ liệu nhà thuốc của bạn theo quy định pháp luật hiện hành; tuy nhiên có thể sẽ không đảm bảo an toàn tuyệt
            đối khỏi việc tiết lộ trái phép phát sinh từ hành động hacking mang tính phá hoại và tinh vi bởi các đối
            tượng bất mãn chứ không phải do lỗi của Chúng tôi.
          </Text>
          <Text style={styles.title}>11. THÔNG TIN THU THẬP CỦA BÊN THỨ BA</Text>
          <Text style={styles.p}>
            11.1 Ứng dụng của Chúng tôi sử dụng Google Maps, một dịch vụ chỉ đường được cung cấp bởi Google, Inc.
            ("Google"). Medlink có thể sử dụng vị trí hoặc lộ trình di chuyển của bạn thông qua GPS khi bạn sử dụng ứng
            dụng. Google cũng có thể chuyển thông tin này cho bên thứ ba mà cần phải thông qua theo luật pháp, hoặc các
            bên thứ ba xử lý thông tin thay cho Google. Google sẽ không kết hợp địa chỉ IP của bạn với bất kỳ dữ liệu
            khác được tổ chức bởi Google.
          </Text>
          <Text style={styles.p}>
            11.2 Chúng tôi, cùng với bên thứ ba, sẽ luôn cung cấp các ứng dụng có thể tải về được thông qua Dịch vụ của
            Chúng tôi. Những ứng dụng này có thể sẽ cho phép bên thứ ba xem được thông tin danh tính của bạn, bao gồm
            tên, ID Người Dùng, địa chỉ IP máy tính của bạn hoặc những thông tin khác như Cookies mà bạn đã từng cài đặt
            hoặc cho phép một bên thứ ba cài đặt vào ứng dụng/Ứng dụng của bạn. Sản phẩm/dịch vụ do bên thứ ba cung cấp
            không thuộc sở hữu và quyền quản lý của Medlink. Chúng tôi khuyến khích bạn đọc kỹ điều khoản và các Chính
            Sách khác được cung cấp bởi các bên thứ ba trên Ứng dụng và các phương tiện truyền thông khác của họ.
          </Text>
          <Text style={styles.title}>12. KHUYẾN CÁO VỀ AN NINH VÀ WEBSITE BÊN THỨ BA</Text>
          <Text style={styles.p}>
            12.1 CHÚNG TÔI KHÔNG BẢO ĐẢM AN NINH NHÀ THUỐC VÀ/HOẶC THÔNG TIN KHÁC MÀ BẠN CUNG CẤP cho Website bên thứ
            ba. Chúng tôi thực hiện một loạt các biện pháp an ninh để duy trì sự an toàn của dữ liệu nhà thuốc của bạn
            dưới sự sở hữu của Chúng tôi hoặc dưới sự kiểm soát của Chúng tôi. Dữ liệu nhà thuốc của bạn được lưu trữ
            đằng sau mạng lưới bảo đảm và chỉ có thể truy cập bởi một số người giới hạn có quyền truy cập đặc biệt tới
            hệ thống và đã được yêu cầu giữ bí mật cho dữ liệu nhà thuốc này. Khi bạn đặt hàng hoặc truy cập vào dữ liệu
            nhà thuốc của bạn, Chúng tôi cung cấp việc sử dụng qua một máy chủ an toàn. Tất cả dữ liệu nhà thuốc hoặc
            thông tin nhạy cảm mà bạn cung cấp được mã hóa vào cơ sở dữ liệu của Chúng tôi để được chỉ truy cập như đã
            nêu ở trên.
          </Text>
          <Text style={styles.p}>
            12.2 Chúng tôi sẽ nỗ lực để cung cấp cho bạn sản phẩm với giá trị gia tăng, chúng ta có thể chọn các Ứng
            dụng bên thứ ba khác nhau để liên kết đến, và nền tảng bên trong các Ứng dụng. Chúng tôi cũng có thể tham
            gia hợp tác xây dựng thương hiệu và các mối quan hệ khác để cung cấp cho thương mại điện tử và các dịch vụ
            khác và các tính năng mà Chúng tôi tạo nên. Những Ứng dụng liên kết có Chính Sách Bảo Mật cũng như thỏa
            thuận an ninh riêng biệt và độc lập. Thậm chí nếu người thứ ba là bên liên kết với Chúng tôi, Chúng tôi
            không có quyền kiểm soát các Ứng dụng liên kết đó, trong đó có sự riêng tư và thu thập dữ liệu riêng biệt
            độc lập. Dữ liệu được thu thập bởi các đối tác đồng thương hiệu của Chúng tôi hoặc những Ứng dụng của bên
            thứ ba (thậm chí nếu được cung cấp trên hoặc thông qua Ứng dụng của Chúng tôi) có thể không được nhận bởi
            Chúng tôi.
          </Text>
          <Text style={styles.p}>
            12.3 Do đó Chúng tôi không có trách nhiệm đối với các nội dung, biện pháp an ninh và các hoạt động của các
            Ứng dụng liên kết. Các Ứng dụng liên kết chỉ phục vụ cho sự thuận tiện của bạn và do đó khi truy cập chúng,
            bạn phải chịu một số rủi ro nhất định. Tuy nhiên, Chúng tôi tìm cách để bảo vệ sự nguyên bản của Ứng dụng
            của Chúng tôi và các liên kết đặt trên đó nên Chúng tôi hoan nghênh bất kỳ thông tin phản hồi về các Ứng
            dụng liên quan (kể cả trong trường hợp một liên kết nào đó không hoạt động).
          </Text>
          <Text style={styles.title}>
            13. LÀM THẾ NÀO ĐỂ KHÔNG THAM GIA, BỎ, YÊU CẦU TRUY CẬP, HOẶC THAY ĐỔI THÔNG TIN BẠN ĐÃ CUNG CẤP CHO CHÚNG
            TÔI?
          </Text>
          <Text style={styles.p}>13.1 Từ chối nhận và Hủy Đồng ý</Text>
          <Text style={styles.p}>
            13.1.1 Để sửa đổi đăng ký nhận tin qua thư điện tử của bạn, xin vui lòng cho Chúng tôi biết bằng cách gửi
            thư điện tử tới bộ phận Chăm sóc khách hàng của Chúng tôi tại địa chỉ được liệt kê dưới đây. Hãy lưu ý rằng
            bạn vẫn sẽ nhận được thư điện tử thông báo liên quan đến bản thân ứng dụng.
          </Text>
          <Text style={styles.p}>
            13.1.2 Bạn có thể rút lại sự đồng ý của bạn đối với việc thu thập, sử dụng và/hoặc tiết lộ dữ liệu nhà thuốc
            của bạn dưới sự sở hữu hoặc kiểm soát của Chúng tôi bằng cách gửi thư điện tử tới bộ phận Chăm sóc khách
            hàng của Chúng tôi tại địa chỉ email được liệt kê trong Mục 17.
          </Text>
          <Text style={styles.p}>
            13.1.3 Một khi chúng tôi đã có hướng dẫn rõ ràng về việc hủy đồng ý của bạn và xác minh danh tính của bạn,
            Chúng tôi sẽ xử lý yêu cầu của bạn cho việc hủy đồng ý đó, và sau đó sẽ không thu thập, sử dụng và/hoặc tiết
            lộ dữ liệu nhà thuốc của bạn theo cách thức nêu trong yêu cầu của bạn. Nếu Chúng tôi không thể xác minh danh
            tính của bạn hoặc hiểu được các chỉ dẫn của bạn, Chúng tôi sẽ liên hệ với bạn để làm rõ yêu cầu của bạn.
          </Text>
          <Text style={styles.p}>
            13.1.4 Tuy nhiên, thu hồi chấp thuận của bạn có thể dẫn đến hậu quả pháp lý nhất định phát sinh từ việc hủy
            thỏa thuận. Về vấn đề này, tùy thuộc vào mức độ thu hồi của bạn về sự đồng ý cho Chúng tôi xử lý dữ liệu nhà
            thuốc của bạn, nó có thể có nghĩa rằng chúng tôi sẽ không thể tiếp tục cung cấp các Dịch Vụ cho bạn, Chúng
            tôi có thể cần phải chấm dứt mối quan hệ hiện tại với bạn và/hoặc hợp đồng bạn có với Chúng tôi và Chúng tôi
            sẽ thông báo cho bạn.
          </Text>
          <Text style={styles.p}>13.2 Yêu cầu truy cập và/hoặc chỉnh sửa dữ liệu nhà thuốc</Text>
          <Text style={styles.p}>
            13.2.1 Nếu bạn đã đăng ký một tài khoản với Chúng tôi, bạn có thể trực tiếp truy cập và/hoặc sửa dữ liệu nhà
            thuốc của bạn hiện đang dưới sự sở hữu hoặc kiểm soát của Chúng tôi thông qua các trang Cài đặt tài khoản
            trên Ứng dụng. Nếu bạn chưa đăng ký tài khoản với Chúng tôi, bạn có thể yêu cầu để truy cập và/hoặc sửa dữ
            liệu nhà thuốc của bạn hiện đang dưới sự sở hữu hoặc kiểm soát của Chúng tôi bằng cách gửi văn bản yêu cầu
            cho Chúng tôi. Chúng tôi cần có đủ thông tin từ bạn để xác định danh tính của bạn cũng như bản chất của yêu
            cầu của bạn để có thể xử lí yêu cầu của bạn. Do đó, hãy gửi yêu cầu bằng văn bản bằng cách gửi email tới cán
            bộ quản lý dữ liệu của Chúng tôi tại địa chỉ email được liệt kê bên dưới trong Mục 17.
          </Text>
          <Text style={styles.p}>
            13.2.2 Đối với yêu cầu truy cập vào dữ liệu nhà thuốc, một khi Chúng tôi có đầy đủ thông tin từ bạn để xử lý
            yêu cầu đó, Chúng tôi sẽ cung cấp cho bạn các dữ liệu nhà thuốc có liên quan trong vòng 30 ngày. Trường hợp
            Chúng tôi không thể đáp ứng cho bạn trong vòng 30 ngày, Chúng tôi sẽ thông báo cho bạn về thời gian sớm nhất
            có thể trong phạm vi mà Chúng tôi có thể cung cấp cho bạn các thông tin yêu cầu. Lưu ý rằng Chúng tôi có thể
            miễn trừ một số loại dữ liệu nhà thuốc khỏi việc yêu cầu truy cập của bạn.
          </Text>
          <Text style={styles.p}>
            13.2.3 Đối với yêu cầu chỉnh sửa dữ liệu nhà thuốc, một khi Chúng tôi có đầy đủ thông tin từ bạn để xử lý,
            Chúng tôi sẽ:
          </Text>
          <Text style={styles.p}>
            (a) Chỉnh sửa dữ liệu nhà thuốc của bạn trong vòng 30 ngày. Trường hợp Chúng tôi không thể làm như vậy trong
            vòng 30 ngày, Chúng tôi sẽ thông báo cho bạn về thời gian sớm nhất mà Chúng tôi có thể thực hiện.
          </Text>
          <Text style={styles.p}>
            (b) Chúng tôi sẽ gửi các dữ liệu nhà thuốc đã chỉnh sửa tới mọi tổ chức khác mà Chúng tôi đã tiết lộ các dữ
            liệu nhà thuốc này trong vòng 1 năm trước ngày điều chỉnh được thực hiện, trừ khi các tổ chức khác không cần
            những dữ liệu nhà thuốc đó cho bất kỳ Mục Đích pháp lý, kinh doanh nào.
          </Text>
          <Text style={styles.p}>
            13.2.4 Không kể đến điều (b) ở trên, nếu bạn yêu cầu, Chúng tôi có thể gửi các dữ liệu nhà thuốc đã chỉnh
            sửa chỉ cho các tổ chức cụ thể mà Chúng tôi đã tiết lộ các dữ liệu nhà thuốc này trong vòng 1 năm trước ngày
            điều chỉnh được thực hiện.
          </Text>
          <Text style={styles.p}>
            13.2.5 Chúng tôi sẽ/có thể tính một mức phí hợp lý cho việc xử lý các yêu cầu truy cập vào dữ liệu nhà thuốc
            của bạn. Nếu Chúng tôi quyết định thu phí, Chúng tôi sẽ cung cấp cho bạn một ước tính bằng văn bản về việc
            tính phí. Xin lưu ý rằng Chúng tôi không cần phải trả lời hoặc xử lý với yêu cầu truy cập của bạn, trừ khi
            bạn đã đồng ý trả tiền lệ phí.
          </Text>
          <Text style={styles.p}>
            13.2.6 Chúng tôi bảo lưu quyền từ chối chỉnh sửa dữ liệu nhà thuốc của bạn dựa theo với các quy định đã nêu
            trong các luật liên quan, luật yêu cầu và/hoặc cho phép một tổ chức từ chối chỉnh sửa dữ liệu nhà thuốc
            trong một số trường hợp quy định.
          </Text>
          <Text style={styles.title}>14. CÂU HỎI, THẮC MẮC HOẶC KHIẾU NẠI? LIÊN HỆ VỚI CHÚNG TÔI</Text>
          <Text style={styles.p}>
            14.1 Nếu bạn có bất kỳ câu hỏi hoặc quan tâm về việc bảo mật của Chúng tôi hoặc các giao dịch của bạn với
            các Dịch Vụ, xin vui lòng liên hệ:hotro@medlink.vn
          </Text>
          <Text style={styles.p}>
            14.2 Nếu bạn có bất kỳ khiếu nại liên quan đến cách Chúng tôi đang xử lý dữ liệu nhà thuốc của bạn hoặc về
            cách thức Chúng tôi đang thực thi luật, Chúng tôi hoan nghênh bạn liên hệ với Chúng tôi.
          </Text>
          <Text style={styles.p}>
            Hãy liên hệ với Chúng tôi qua email với đơn khiếu nại của bạn: E-mail: hotro@medlink.vn
          </Text>
          <Text style={styles.p}>
            14.3 Nếu bạn gửi yêu cầu khiếu nại thông qua thư hay email, vui lòng ghi thông tin vụ khiếu nại về việc áp
            dụng luật liên quan đến an toàn thông tin nhà thuốc ở mục tiêu đề thư. Việc này sẽ giúp Chúng tôi xử lý yêu
            cầu của bạn nhanh chóng bằng cách chuyển yêu cầu đó sang bộ phận chịu trách nhiệm trong công ty Chúng tôi để
            tiếp tục xử lý. Ví dụ, bạn có thể thêm vào mục tiêu đề email/thư nội dung “Khiếu nại áp dụng luật”. Chúng
            tôi sẽ cố gắng để xử lí các phàn nàn hoặc khiếu nại của bạn trong thời gian sớm nhất có thể.
          </Text>
          <Text style={styles.title}>15 . LUẬT ĐIỀU CHỈNH</Text>
          <Text style={styles.p}>
            Chính Sách Bảo Mật này được điều chỉnh bởi pháp luật của nước Cộng hòa Xã hội chủ nghĩa Việt Nam.
          </Text>
          <Text style={[styles.p, { textAlign: 'right', fontWeight: 'bold', marginTop: vw(10) }]}>Medlink,</Text>
        </View>
      </ScrollView>
    );
  }

  _renderInfoSupport() {
    return (
      <ScrollView>
        <View style={{ padding: vw(15) }}>
          <Text style={styles.title} selectable={true}>
            Làm thế nào để liên hệ với bộ phận Chăm Sóc Khách Hàng của Medlink?
          </Text>
          <Text style={styles.p} selectable={true}>
            Bạn có thể liên hệ với bộ phận Chăm Sóc Khách Hàng của Medlink theo các cách sau:
          </Text>
          <View style={{ flexDirection: 'row', marginBottom: vw(10), flexWrap: 'wrap' }}>
            <Text selectable={true} style={{ color: '#333333', lineHeight: vw(24) }}>
              - Gọi điện đến tổng đài:{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Communications.phonecall('024 7308 0333', true);
              }}
            >
              <Text selectable={true} style={{ fontWeight: 'bold', color: '#333333', lineHeight: vw(24) }}>
                024 7308 0333
              </Text>
            </TouchableOpacity>
            <Text selectable={true} style={{ color: '#333333', lineHeight: vw(24) }}>
              {' '}
              | Hotline:{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Communications.phonecall('092 608 0333', true);
              }}
            >
              <Text selectable={true} style={{ fontWeight: 'bold', color: '#333333', lineHeight: vw(24) }}>
                092 608 0333
              </Text>
            </TouchableOpacity>
          </View>
          <Text selectable={true} style={styles.p}>
            Thời gian hỗ trợ: 24/7 tất cả các ngày trong tuần (Riêng ngày Lễ, Tết giờ làm việc từ 8h00 đến 17h00)
          </Text>
          <Text selectable={true} style={styles.p}>
            - Gửi email yêu cầu hỗ trợ tới địa chỉ: hotro@medlink.vn
          </Text>
        </View>
      </ScrollView>
    );
  }

  _renderLegalInfo() {
    return (
      <ScrollView>
        <View style={{ padding: vw(15) }}>
          <Text style={styles.p}>
            Ứng dụng Medlink sử dụng Google Maps, một dịch vụ chỉ đường được cung cấp bởi Google, Inc. ("Google").
            Medlink sử dụng GPS và Google Location để xác định vị trí và lộ trình di chuyển của Người Dùng.
          </Text>
        </View>
      </ScrollView>
    );
  }

  _renderPolicyApplication = () => {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ padding: vw(15) }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>{dataPolicy.policyApp.title}</Text>
          {dataPolicy.policyApp.list.map(item => {
            return (
              <View key={item.title}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>{item.title}</Text>
                <Text style={styles.p}>{item.content}</Text>
              </View>
            );
          })}
          <Text
            style={{
              fontSize: 13,
              fontStyle: 'italic',
              fontWeight: 'bold',
              alignItems: 'center',
              color: 'red',
              margin: 5,
            }}
          >
            {dataPolicy.policyApp.notice}
          </Text>
        </View>
      </ScrollView>
    );
  };

  render() {
    const dataHelpScreen = this.props.navigation.getParam('dataHelpScreen', null);
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {dataHelpScreen.screenType === 'GENERAL_POLICY' && this._renderGeneralPolicy()}
        {dataHelpScreen.screenType === 'SECURE_POLICY' && this._renderSecurePolicy()}
        {dataHelpScreen.screenType === 'INFO_SUPPORT' && this._renderInfoSupport()}
        {dataHelpScreen.screenType === 'LEGAL_INFO' && this._renderLegalInfo()}
        {dataHelpScreen.screenType === 'POLICY_APPLICATION' && this._renderPolicyApplication()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  title: {
    fontFamily: 'Arial',
    fontSize: vw(16),
    color: '#333333',
    fontWeight: 'bold',
    paddingTop: vw(20),
    paddingBottom: vw(10),
  },
  p: {
    fontFamily: 'Arial',
    fontSize: vw(14),
    color: '#333333',
    marginBottom: vw(5),
    lineHeight: vw(24),
  },
});

function mapStateToProps(state: any) {
  return {};
}

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HelpScreen);
