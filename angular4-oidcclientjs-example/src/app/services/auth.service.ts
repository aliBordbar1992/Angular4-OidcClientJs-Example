import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager(getClientSettings());
  private user: User = null;

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }
  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
    });
  }

  
  startSilent(): Promise<User>{
    return this.manager.signinSilent();
  }

  completeSilent(): Promise<void> {
    return this.manager.signinSilentCallback().then(user => {
      this.user = user;
    });
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://localhost:5555/',
    client_id: 'AdminPanel',
    redirect_uri: 'http://localhost:4200/auth-callback',
    silent_redirect_uri: 'http://localhost:4200/assets/silent-refresh.html',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: "code",
    scope: "openid profile",
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}