import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Fastfeet" />
          <NavLink to="/order" activeStyle={{ color: '#444444' }}>
            ENCOMENDAS
          </NavLink>
          <NavLink to="/deliveryman" activeStyle={{ color: '#444444' }}>
            ENTREGADORES
          </NavLink>
          <NavLink to="/recipient" activeStyle={{ color: '#444444' }}>
            DESTINATÁRIOS
          </NavLink>
          <NavLink to="/problem" activeStyle={{ color: '#444444' }}>
            PROBLEMAS
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/" onClick={handleSignOut}>
                sair do sistema
              </Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
