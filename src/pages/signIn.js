import { useState } from "react";
import { auth } from "../infra/firebase";
import { signInWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { sweetAlert } from "../features/alert";
import { Button,TextField } from "@mui/material";
import { Link } from "react-router-dom";
import GoogleSignIn from "../components/googleSignIn";
import "../css/signIn.css"

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
                    sweetAlert("success","ログインに成功しました")
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
                sweetAlert("error","アカウントを作成してください")
            });


        } catch (error) {
            console.error('アカウント作成に失敗しました', error.message);
        }
    }
    
    
    return(
        <div className="wrapper_signInForm">
            <form id="form" onSubmit={handleSubmit}>
                <TextField name="mailAddress" label="メールアドレス" variant="outlined" value={mail} onChange={onChangeMail}/>
                <TextField name="passWord" label="パスワード" variant="outlined" value={password} onChange={onChangePassword}/>
                <Button type="submit" label="送信" variant="contained">送信</Button>
            </form>
            <GoogleSignIn/>
            <div className="link_item">
                <Link to={"/signUp"}>ユーザ登録はこちらから</Link>
            </div>
            <div className="link_item">
                <Link to={"/resetPassword"}>パスワードを忘れた</Link>
            </div>
        </div>
    )
}