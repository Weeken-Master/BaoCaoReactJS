import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons";
var routes = [
  {
    path: "/index",
    name: "Trang Chủ",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/tin-tuc",
    name: "Tin Tức",
    icon: "ni ni-calendar-grid-58 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/thong-tin",
    name: "Thông Tin",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/bai-viet",
    name: "Bài Viết",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/dang-nhap",
    name: "Đăng Nhập",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/dang-ki",
    name: "Đăng Kí",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
