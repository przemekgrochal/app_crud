import React, { useState, useEffect } from 'react';
import { isExpired, decodeToken } from "react-jwt";
import './Users.scss';
import { Item, RequiredRule, EmailRule, } from 'devextreme-react/form';
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Editing,
  Popup,
  Lookup,
  Position,
  Form,
  ColumnChooser,
  FilterRow,
} from 'devextreme-react/data-grid';
import { Auth } from "../../auth/Auth";
import { useAuth } from '../../contexts/auth';
import { useAppContext } from '../../contexts/AppContext';
import { fetchData } from '../../api/index';
import { http } from "../../config";

const Users  = () => {
  const { appSetLoginMsg , loginMsg}  =  useAppContext();
  const { user, setUser, signOut } = useAuth();
  const  usersApi: string = `${http}/api/user`;
  const [requestData, setRequestData] = useState<any>({
    users: [],
    method: 'GET',
    userID: '',
    body: null,
    change: false,
  });

  const [msg, setMsg] = useState('');

  const handleMsg = () => {
    setTimeout(()=>{
      setMsg('');
    }, 4000);
  }

  useEffect(() => {
    let userToken: string =  window.localStorage.getItem("userToken") || '';
    // setUser({
    //   ...user,
    //   email: decodeToken(userToken).userEmail,
    // });

    fetchData.usersApi({
      urlApi: `${usersApi}/${requestData.userID}`,
      methods: requestData.method,
      headers: {
          ['Content-Type']: 'application/json',
          ['Authorization']: `Bearer ${userToken}`,
      },
      bodyData: requestData.body

      }).then((response:any) => {

        if(response){
          if(response.json.message) {
            setMsg(response.json.message);
            handleMsg();
          } 

          if(response.json.accessToken){
            window.localStorage.setItem("userToken", response.json.accessToken); 
          }

          setRequestData({
            users: response.json.users,
            method: 'GET',
            userID: '',
            body: null,
            change: false
          });
        }

        
        
      }).catch( (error:any) => {
          throw error
      })
  }, [requestData.change]);

  const deleteUser = (e: any) => {
    setRequestData({
      users: requestData.users,
      method: 'DELETE',
      userID: e.data.id,
      body: null,
      change: true
    });

    if(user.email === e.data.email) {
      Auth.logOut();
      appSetLoginMsg('');
    }
  }

  const createUser = (e:any) => {
    setRequestData({
      users: requestData.users,
      method: 'POST',
      userID: '',
      body: {
        email: e.data.email,
        name: e.data.name,
        role: e.data.role,
      },
      change: true
    });
  }

  const editUser = (e:any) => {
    setRequestData({
      users: requestData.users,
      method: 'PATCH',
      userID: e.data.id,
      body: {
        email: e.data.email,
        name: e.data.name,
        role: e.data.role,
      },
      change: true
    });
  }

  return (
    <>
      <h2 className={'content-block'}>Users List</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <div className={'logos-container'}>
          <div style={{color: 'red', marginBottom: '15px'}}>{msg}</div>
            <DataGrid
              id="gridContainer"
              keyExpr="id"
              dataSource={requestData.users}
              allowColumnReordering={true}
              allowColumnResizing={true}
              columnAutoWidth={true}
              showBorders={false}
              focusedRowEnabled={true}
              onRowRemoved={deleteUser}
              onRowInserted={createUser}
              onRowUpdated={editUser}
            >

              <SearchPanel visible={true} highlightCaseSensitive={true} />
              <FilterRow visible={true} />
              <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]}/>

              <Column
                caption="ID"
                dataField="id"
                dataType="number"
              />
              <Column
                caption="ROLE"
                dataField="role"
                dataType="text"
              />
              <Column
                caption="EMAIL"
                dataField="email"
                dataType="text"
              />
              <Column
                caption="NAME"
                dataField="name"
                dataType="text"
              />

              <Editing
                mode="popup"
                useIcons={true}
                allowAdding={true}
                allowDeleting={true}
                allowUpdating={true}
              >

                <Popup title="User Edit" showTitle={true} width={600} height={425}/>

                <Form>
                  <Item itemType="group" colCount={2} colSpan={2}>
                    <Item dataField="id" disabled/>
                    <Item dataField="role">
                      <RequiredRule message="Role is required" />
                    </Item>
                    <Item dataField="email">
                      <RequiredRule message="Email is required" />
                      <EmailRule message="Email is invalid" />
                    </Item>
                    <Item dataField="name">
                    <RequiredRule message="Name is required" />
                    </Item>
                  </Item>
                </Form>

              </Editing>
            </DataGrid>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;