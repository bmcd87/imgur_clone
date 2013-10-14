module SessionsHelper
  def current_user
    @current_user ||= Session.find_user(session[:session_token])
  end

  def current_user=(user)
    @current_user = user
    new_session = user.sessions.create
    session['session_token'] = new_session.session_token
  end

  def require_logged_in!
    unless current_user
      if request.xhr?
        render text: "not logged in", status: 401
      else
        redirect_to new_session_url
      end
    end
  end

  def destroy_session
    Session.find_by_session_token(session[:session_token]).destroy
    session[:session_token] = nil
    @current_user = nil
  end
end
