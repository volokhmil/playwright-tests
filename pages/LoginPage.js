class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("Email");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login",exact: true });
  }

  async goto() {
    await this.page.goto("https://staging-app.creativelysquared.com/login");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

export { LoginPage };
