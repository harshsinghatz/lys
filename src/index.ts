import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

if (typeof window === 'object') {
    const userform = new UserForm(document.querySelector(
        '#root'
    ), User.buildUser({
        name: 'harsh',
        age: 10,
    }));

    userform.render();
}
