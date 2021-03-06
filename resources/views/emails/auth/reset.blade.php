@extends('layouts.email')

@section('title', _i('Passwort zurücksetzen'))

@section('content')

  <tr>
      <td bgcolor="#ffffff" style="padding: 0 40px 40px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; text-align: center;">
          <p style="margin: 0;">{{ _i('Hallo  %s',[$user->username]) }}!</p>
          <p style="margin: 0;">{{_i('Bitte klick auf folgenden Link um dein Passwort zurückzusetzen. Sollte diese Aktion nicht von dir beantragt worden sein, kontaktiere bitte umgehend den Support.') }}</p>
      </td>
  </tr>

  <tr>
      <td bgcolor="#ffffff" style="padding: 0 40px 40px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;">
          <!-- Button : BEGIN -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto">
              <tr>
                  <td style="border-radius: 3px; background: #222222; text-align: center;" class="button-td">
                      <a href="{{$url}}" style="background: #222222; border: 15px solid #222222; font-family: sans-serif; font-size: 13px; line-height: 110%; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a">
                          &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ffffff;">{{_i('Passwort jetzt zurücksetzen.')}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                      </a>
                  </td>
              </tr>
          </table>
          <!-- Button : END -->
      </td>
  </tr>

  <tr>
      <td bgcolor="#ffffff" style="padding: 0 40px 40px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; text-align: center;">
          <p style="margin: 0;">{{ _i('Dein Team von %s',[$from]) }}!</p>
      </td>
  </tr>

@stop
