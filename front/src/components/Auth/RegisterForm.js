"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisterForm;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var SessionContext_1 = require("@/components/Context/SessionContext");
var react_hot_toast_1 = require("react-hot-toast");
function RegisterForm() {
    var _this = this;
    var router = (0, navigation_1.useRouter)();
    var login = (0, SessionContext_1.useSession)().login;
    var _a = (0, react_1.useState)(""), firstName = _a[0], setFirstName = _a[1];
    var _b = (0, react_1.useState)(""), lastName = _b[0], setLastName = _b[1];
    var _c = (0, react_1.useState)(""), email = _c[0], setEmail = _c[1];
    var _d = (0, react_1.useState)(""), password = _d[0], setPassword = _d[1];
    var _e = (0, react_1.useState)(""), confirmPassword = _e[0], setConfirmPassword = _e[1];
    var _f = (0, react_1.useState)(false), loading = _f[0], setLoading = _f[1];
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, errorMsg, errorData, _a, data, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (password !== confirmPassword) {
                        react_hot_toast_1.default.error("Las contraseñas no coinciden");
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, 10, 11]);
                    return [4 /*yield*/, fetch("http://localhost:8080/api/users/register", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password }),
                        })];
                case 2:
                    response = _b.sent();
                    if (!!response.ok) return [3 /*break*/, 7];
                    errorMsg = "Error al registrarse";
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, response.json()];
                case 4:
                    errorData = _b.sent();
                    errorMsg = errorData.message || errorMsg;
                    return [3 /*break*/, 6];
                case 5:
                    _a = _b.sent();
                    return [3 /*break*/, 6];
                case 6: throw new Error(errorMsg);
                case 7: return [4 /*yield*/, response.json()];
                case 8:
                    data = _b.sent();
                    // Guardar token y loguear automáticamente
                    login(data.token);
                    react_hot_toast_1.default.success("Usuario registrado correctamente");
                    // Redirigir según rol
                    if (data.type === "ADMIN")
                        router.push("/admin");
                    else
                        router.push("/user");
                    return [3 /*break*/, 11];
                case 9:
                    err_1 = _b.sent();
                    react_hot_toast_1.default.error(err_1.message || "Error en el registro");
                    return [3 /*break*/, 11];
                case 10:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    return (<form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <input type="email" placeholder="Email address" required value={email} onChange={function (e) { return setEmail(e.target.value); }} className="form-input block w-full px-3 py-3 rounded-lg border border-background-dark/20 dark:border-background-light/20 bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light placeholder-background-dark/50 dark:placeholder-background-light/50 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
        <input type="password" placeholder="Password" required value={password} onChange={function (e) { return setPassword(e.target.value); }} className="form-input block w-full px-3 py-3 rounded-lg border border-background-dark/20 dark:border-background-light/20 bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light placeholder-background-dark/50 dark:placeholder-background-light/50 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
        <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={function (e) { return setConfirmPassword(e.target.value); }} className="form-input block w-full px-3 py-3 rounded-lg border border-background-dark/20 dark:border-background-light/20 bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light placeholder-background-dark/50 dark:placeholder-background-light/50 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
      </div>

      <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark disabled:opacity-50">
        {loading ? "Creando cuenta..." : "Crear Cuenta"}
      </button>
    </form>);
}
