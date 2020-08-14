@extends('layouts.login')

@section('content-login')

          {!! Form::open(['url' => URL::temporarySignedRoute('resetPasswordStore', now()->addMinutes(30))]) !!}

          {{csrf_field()}}

          <p>{{ _i('Setze dein Passwort zurück, indem ein neues Passwort für dein Konto festlegst.') }}</p>

          <input type="hidden" name="user" id="user" value="{{$user}}" />

          <div class="form-group">
            <label for="password1">{{ _i('Passwort') }}</label>
            <input type="password" class="form-control" name="password1" id="password1" placeholder="{{ _i('Passwort') }}">
          </div>

          <div class="form-group">
            <label for="password2">{{ _i('Passwort wiederholen') }}</label>
            <input type="password" class="form-control" name="password2"  id="password2" placeholder="{{ _i('Passwort wiederholen') }}">
          </div>

          @if (\Session::get('success'))
              <div class="alert alert-success">
                  <p>{{ \Session::get('success') }}</p>
              </div>
          @endif

          @if ($errors->any())
            <div class="errors error-list-container">
              <ul class="error-list">
                @foreach ($errors->all() as $error)
                    <li class="error-list-item">{{ $error }}</li>
                @endforeach

              </ul>
            </div>
          @endif

          <div class="submit_container">
              {!! Form::submit(_i('Passwort jetzt zurücksetzen!'), ['class' => 'btn btn-outline-success float-right']) !!}
              <div class="clearfix"></div>
          </div>

          {!! Form::close() !!}

@stop
