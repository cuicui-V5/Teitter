const fileToImg = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const img = new Image();
        // 将传进来的file转换成dataURl
        reader.readAsDataURL(file);
        reader.onload = () => {
            img.src = reader.result as string;
        };
        reader.onerror = (e) => {
            reject(e);
        };
        img.onload = () => {
            resolve(img);
        };
        img.onerror = (e) => {
            reject(e);
        };
    });
};

export const imgCompress = (
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality = 0.2,
    type = "image/png",
): Promise<{ blob: Blob; canvas: HTMLCanvasElement }> => {
    return new Promise(async (resolve, reject) => {
        const img = await fileToImg(file);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 获取图片原始尺寸
        const { width: originWidth, height: originHeight } = img;
        // 确定目标尺寸
        let targetWidth = originWidth,
            targetHeight = originHeight;
        // 如果图片尺寸大于目标尺寸, 那么就进行等比缩放
        if (targetWidth > maxWidth || targetHeight > maxHeight) {
            // 等比缩小的算法
            // 如果是横着的图, 图片的宽等于最大宽度, 高等比缩放;
            // 如果是竖着的图, 图片的高等于最大高度, 宽等比缩放;
            // 先判断是横着的图还是竖着的图
            if (targetWidth > targetHeight) {
                //横着的
                targetWidth = maxWidth;
                targetHeight = targetHeight * (maxWidth / originWidth);
            } else {
                //竖着的
                targetHeight = maxHeight;
                targetWidth = targetWidth * (maxHeight / originHeight);
            }
        }
        try {
            // 把img绘制进canvas
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx?.clearRect(0, 0, targetWidth, targetHeight);
            ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);
            // document.body.append(canvas);
            // 获取blob对象
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve({ blob, canvas });
                    } else {
                        reject(new Error("转换失败"));
                    }
                },
                type,
                quality,
            );
        } catch (error) {
            reject(error);
        }
    });
};
