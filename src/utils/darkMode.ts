import { useTeitterStore } from "@/stores/teitter";

// 切换深色模式
export const changeDarkMode = () => {
    // 先判断当前的模式
    const isDark = document.documentElement.classList.contains("dark-mode");

    if (isDark) {
        // 处于深色模式
        // 切换到浅色模式
        console.log("切换到浅色模式");
        enableLight();
        localStorage.setItem("isDarkMode", "false");
    } else {
        console.log("切换到深色模式");
        enableDark();
        localStorage.setItem("isDarkMode", "true");
    }
};
// 在系统深色模式切换的时候, 根据系统的设定切换颜色模式
export const changeDarkModeAsSystem = () => {
    // 先判断当前的模式
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (isSystemDark.matches) {
        console.log("系统切换到深色模式了, 切换到深色模式");
        enableDark();
        localStorage.setItem("isDarkMode", "true");
    } else {
        // 切换到浅色模式
        console.log("切换到浅色模式");
        enableLight();
        localStorage.setItem("isDarkMode", "false");
    }
};
// 启用浅色模式
const enableLight = () => {
    const store = useTeitterStore();

    document.documentElement.classList.remove("dark-mode");
    document.documentElement.classList.add("light-mode");
    store.isDarkMode = false;
};
// 启用深色模式
const enableDark = () => {
    const store = useTeitterStore();

    document.documentElement.classList.remove("light-mode");
    document.documentElement.classList.add("dark-mode");
    store.isDarkMode = true;
};
// 初始化的时候检查是否处于深色模式
export const checkDarkMode = () => {
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)");
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode == "true" || isSystemDark.matches) {
        console.log("切换到深色模式");

        enableDark();
    } else {
        console.log("切换到浅色模式");

        enableLight();
    }
};
