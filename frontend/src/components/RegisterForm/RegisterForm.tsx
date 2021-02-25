import React, { useState, useRef, useCallback, SyntheticEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  EmailRule
} from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import LoadIndicator from 'devextreme-react/load-indicator';
import { createAccount } from '../../api/auth';
import { Auth } from "../../auth/Auth";
import { useAppContext } from '../../contexts/AppContext';

import './RegisterForm.scss';

export default function (props:any) {
  const { appSetLoginMsg }  =  useAppContext();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const formData = useRef<any>({});

  const confirmPassword = useCallback(
    ({ value }) => value === formData.current.password,
    []
  );

const onSubmit = async (e: any) => {
    e.preventDefault();
    
    const { email , password }: any = formData.current;

    Auth.register(email, password)
    .then(res => {

        if(res.json.message) {
            
            setMessage(res.json.message);
            
            if(res.json.message !== "User is exist"){
                appSetLoginMsg(res.json.message);
                history.push('/login');
            }

            return;
        } 
    });
}

    return (
        <form className={'create-account-form'} onSubmit={onSubmit}>
            <div style={{color: message === "User is exist" ? 'red' : 'green', marginBottom: '15px'}}>{message}</div>
            <Form formData={formData.current} disabled={loading}>
                <Item
                dataField={'email'}
                editorType={'dxTextBox'}
                editorOptions={emailEditorOptions}
                >
                <RequiredRule message="Email is required" />
                <EmailRule message="Email is invalid" />
                <Label visible={false} />
                </Item>
                <Item
                dataField={'password'}
                editorType={'dxTextBox'}
                editorOptions={passwordEditorOptions}
                >
                <RequiredRule message="Password is required" />
                <Label visible={false} />
                </Item>
                <Item
                dataField={'confirmedPassword'}
                editorType={'dxTextBox'}
                editorOptions={confirmedPasswordEditorOptions}
                >
                <RequiredRule message="Password is required" />
                <CustomRule
                    message={'Passwords do not match'}
                    validationCallback={confirmPassword}
                />
                <Label visible={false} />
                </Item>
                <Item>
                <div className='policy-info'>
                    By creating an account, you agree to the <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link>
                </div>
                </Item>
                <ButtonItem>
                <ButtonOptions
                    width={'100%'}
                    type={'default'}
                    useSubmitBehavior={true}
                >
                    <span className="dx-button-text">
                    {
                        loading
                        ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                        : 'Create a new account'
                    }
                    </span>
                </ButtonOptions>
                </ButtonItem>
                <Item>
                <div className={'login-link'}>
                    Have an account? <Link to={'/login'}>Sign In</Link>
                </div>
                </Item>
            </Form>
        </form>
    );
}

const emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email' };
const passwordEditorOptions = { stylingMode: 'filled', placeholder: 'Password', mode: 'password' };
const confirmedPasswordEditorOptions = { stylingMode: 'filled', placeholder: 'Confirm Password', mode: 'password' };
