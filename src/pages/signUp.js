import { useState } from "react";
import { auth } from "../infra/firebase";
import { createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";

export default function SignUp(){
    // 各入力の状態変数
    const [userName,setUserName] = useState(""); 
    const [mail,setMail] = useState("");
    const [password,setPassword] = useState("");

    // 入力によって状態変数を更新する
    const onChangeUserName = (e) => {
        setUserName(e.target.value);
    };
    const onChangeMail = (e) => {
        setMail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    // 送信時の処理
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Firebase Authでユーザーを作成
            const userCredential = await createUserWithEmailAndPassword(auth, mail, password);
            // 確認メール内リンクのリダイレクト先のURLを設定
            const actionCodeSettings = {
                url: "http://localhost:3000/", // リダイレクト先のURL。本番環境では変更する
                handleCodeInApp: true,
            };
            //ユーザ登録の確認メールを送信
                sendEmailVerification(userCredential.user, actionCodeSettings);
                console.log(
                    mail +
                    "  宛てに確認メールを送信しました。メールボックスを確認してください。"
                );

        } catch (error) {
            console.error('アカウント作成に失敗しました', error.message);
        }
    }
    
    
    return(
        <div className="wrapper_signInForm">
            <form id="form" onSubmit={handleSubmit}>
                <label>
                    ユーザーネーム 
                    <input name="userName" value={userName} onChange={onChangeUserName} />
                </label>
                <label>
                    メールアドレス 
                    <input name="mailAddress" value={mail} onChange={onChangeMail} />
                </label>
                <label>
                    パスワード 
                    <input name="passWord" value={password} onChange={onChangePassword} />
                </label>
                <button type="submit">送信</button>
            </form>
        </div>
    )
}