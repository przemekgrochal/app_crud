import React, { useState, useRef, useCallback, SyntheticEvent } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import Form, {
    Item,
    Label,
    ButtonItem,
    ButtonOptions,
    RequiredRule,
    EmailRule,
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
import { Auth } from "../../auth/Auth";
import { useAuth } from '../../contexts/auth';
import { useAppContext } from '../../contexts/AppContext';
import "./LoginForm.scss";

export default function (props:any) {
    const history = useHistory();
    const { appSetLoginMsg , loginMsg}  =  useAppContext();
    const { signIn, logIn }  =  useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const formData = useRef({});

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        const { email , password }: any = formData.current;

        Auth.logIn(email, password)
        .then(res => {

            if(res.json.message) {
                setMessage(res.json.message);
                appSetLoginMsg('');
                return;
            } 

            logIn(email , password);
        });
    }

    const onCreateAccountClick = () => history.push("/create-account");

    return (
        <form className={"login-form"} onSubmit={onSubmit}>
            <div style={{color: 'red', marginBottom: '15px'}}>{message}</div>
            <div style={{color: 'green', marginBottom: '15px'}}>{loginMsg}</div>
            <Form formData={formData.current} disabled={loading}>
                <Item
                    dataField={"email"}
                    editorType={"dxTextBox"}
                    editorOptions={emailEditorOptions}
                >
                    <RequiredRule message="Email is required" />
                    <EmailRule message="Email is invalid" />
                    <Label visible={false} />
                </Item>
                <Item
                    dataField={"password"}
                    editorType={"dxTextBox"}
                    editorOptions={passwordEditorOptions}
                >
                    <RequiredRule message="Password is required" />
                    <Label visible={false} />
                </Item>
                <Item
                    dataField={"rememberMe"}
                    editorType={"dxCheckBox"}
                    editorOptions={rememberMeEditorOptions}
                >
                    <Label visible={false} />
                </Item>
                <ButtonItem>
                    <ButtonOptions
                        width={"100%"}
                        type={"default"}
                        useSubmitBehavior={true}
                    >
                        <span className="dx-button-text">
                            {loading ? (
                                <LoadIndicator
                                    width={"24px"}
                                    height={"24px"}
                                    visible={true}
                                />
                            ) : (
                                "Sign In"
                            )}
                        </span>
                    </ButtonOptions>
                </ButtonItem>
                <Item>
                    <div className={"link"}>
                        <Link to={"/reset-password"}>Forgot password?</Link>
                    </div>
                </Item>
                <ButtonItem>
                    <ButtonOptions
                        text={"Create an account"}
                        width={"100%"}
                        onClick={onCreateAccountClick}
                    />
                </ButtonItem>
            </Form>
        </form>
    );
}

const emailEditorOptions = {
    stylingMode: "filled",
    placeholder: "Email",
    mode: "email",
};
const passwordEditorOptions = {
    stylingMode: "filled",
    placeholder: "Password",
    mode: "password",
};
const rememberMeEditorOptions = {
    text: "Remember me",
    elementAttr: { class: "form-text" },
};
