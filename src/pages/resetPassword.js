import { auth } from "../infra/firebase";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { TextField,Button } from "@mui/material";

const ResetPassword = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email } = event.target;
    try {
      const actionCodeSettings = {
        // リダイレクト先のURLを指定
        url: "http://localhost:3000", //本番環境では変更
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(auth, email.value, actionCodeSettings);
    } catch (error) {
      console.log("メール送れなかった")
    }
  };

  return (
    <div className="form_container">
      <div className="form_wrapper">
        <div className="form_outer">
          <div className="form_title">
            <h2>パスワードの再設定</h2>
          </div>
          {/* メールの送信ログの表示 */}
          <form onSubmit={handleSubmit}>
            <div className="text_field">
              <TextField
                placeholder="登録済のメールアドレス"
                required
                fullWidth
                name="email"
                type="email"
              />
            </div>
            <div className="button_field">
              <Button variant="contained" type="submit">
                送信
              </Button>
            </div>
            <div className="link_section">
              <div className="link_item">
                <Link to={"/"}>サインインはこちら</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
