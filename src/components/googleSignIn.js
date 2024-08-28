import { auth } from "../infra/firebase";
import { sweetAlert } from "../features/alert";
import { provider } from "../infra/firebase";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@mui/material";

export default function GoogleSignIn() {

    // ログイン
    const handleSubmit = async (event) => {
        event.preventDefault(); // form要素のsubmit時のデフォルトイベント（ページリロード）を無効化する
        try {
            // Googleログインポップアップを表示
            await signInWithPopup(auth, provider);
        } catch (error) {
            // エラーハンドリング
            sweetAlert('error', 'ログインに失敗しました');
        }
    };

    return (
        <div className="wrapper_googleSignInForm">
            <form id="form" onSubmit={handleSubmit}>
                <Button type="submit" label="送信" variant="contained">Googleでログイン</Button>
            </form>
        </div>
    );
}
