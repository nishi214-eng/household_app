// 画像のリサイズを行う関数 入力：File 出力：File
export const resizeImg = (imageFile) => {
    return new Promise<File>((resolve, reject) => {
        const img = new Image();
        // リーダーでfileオブジェクトを読み取り、データurlに変換
        const reader = new FileReader();

        // リーダーの読み込み完了時に呼ばれる
        reader.onload = (e) => {
            if (e.target && e.target.result) {
                img.src = e.target.result;
            }
        };
        
        reader.onerror = (error) => {
            reject("画像読み込み時にエラーが発生しました");
        };

        reader.readAsDataURL(imageFile);

        // imgの読み込み完了時に呼ばれる
        img.onload = () => {
            const imageAspect = img.width / img.height;
            const maxSize = 300; // 画像の縦幅・横幅の上限指定
            const fileName = imageFile.name;

            // もし画像の大きさが縦横どちらも500pxを超えていないなら元のファイルをそのまま保存
            if (img.width <= maxSize && img.height <= maxSize) {
                resolve(imageFile);
            } else {
                let canvasWidth, canvasHeight;

                // 横長の画像の場合
                if (imageAspect >= 1) {
                    canvasWidth = maxSize;
                    canvasHeight = maxSize / imageAspect;
                } else {
                    // 縦長の場合
                    canvasHeight = maxSize;
                    canvasWidth = maxSize * imageAspect;
                }

                const canvas = document.createElement("canvas");
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                const ctx = canvas.getContext("2d");

                if (ctx) {
                    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
                    // canvasを画像としてFile形式に変換し、親コンポーネントに渡す
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const file = new File([blob], fileName, { type: "image/png" });
                            resolve(file);
                        } else {
                            reject(new Error("キャンバスをblobに変換できませんでした"));
                        }
                    }, "image/png");
                } else {
                    reject(new Error("キャンバスが存在しません"));
                }
            }
        };

        img.onerror = (error) => {
            reject(error);
        };
    });
};

export default resizeImg;
