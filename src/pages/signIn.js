import { useState } from "react";
import { auth } from "../infra/firebase";
import { signInWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { sweetAlert } from "../features/alert";

export default function SignIn(){
    // 各入力の状態変数
    const [mail,setMail] = useState("");
    const [password,setPassword] = useState("");

    // 入力によって状態変数を更新する
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
            signInWithEmailAndPassword(auth, mail, password)
            .then((userCredential) => {
                //  サインイン 
                const user = userCredential.user;
                //メールアドレスを認証しているか判別
                if(auth.currentUser.emailVerified){
                    console.log("メアド認証済")
                }else{
                    // 確認メール内リンクのリダイレクト先のURLを設定
                    const actionCodeSettings = {
                        url: "http://localhost:3000/", // リダイレクト先のURL。本番環境では変更する
                        handleCodeInApp: true,
                    };
                    //ユーザ登録の確認メールを送信
                    sendEmailVerification(user, actionCodeSettings);
                    sweetAlert("error","メールアドレスを認証してください")
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });


        } catch (error) {
            console.error('アカウント作成に失敗しました', error.message);
        }
    }
    
    
    return(
        <div className="wrapper_signInForm">
            <form id="form" onSubmit={handleSubmit}>
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