<?php

namespace App\Helper;

class ValidationHelper
{

    public static function getMessages(){

      return [
           'accepted'             => _i('Das Feld ":attribute" muss akzeptiert werden.'),
           'active_url'           => _i('Das Feld ":attribute" beinhaltet keine gültige URL'),
           'after'                => _i('":attribute" muss ein Datum enthalten welches nach :date liegt.'),
           'after_or_equal'       => _i('":attribute" muss ein Datum enthalten welches nach oder am :date ist.'),
           'alpha'                => _i('Das Feld ":attribute" darf nur Buchstaben enthalten.'),
           'alpha_dash'           => _i('Das Feld ":attribute" darf nur Buchstaben,Zahlen und Striche enthalten.'),
           'alpha_num'            => _i('Das Feld ":attribute" darf nur Buchstaben und Zahlen enthalten.'),
           'array'                => _i('Das Feld ":attribute" muss eine Liste (Array) sein.'),
           'before'               => _i('":attribute" muss vor dem Datum :date sein.'),
           'before_or_equal'      => _i('":attribute" muss vor oder am Datum (:date) sein.'),
           'between'              => [
               'numeric' => _i('Das Feld ":attribute" muss zwischen :min und :max liegen.'),
               'file'    => _i('Die Datei ":attribute" darf :min und :max Kilobytes groß sein.'),
               'string'  => _i('":attribute" muss zwischen :min und :max Zeilen lang sein.'),
               'array'   => _i('":attribute" muss zwischen :min und :max Elemente enthalten.'),
           ],
           'boolean'              => _i('Das Feld ":attribute" muss ein booleschen Wert enthalten.'),
           'confirmed'            => _i('Das Feld ":attribute" muss bestätigt sein.'),
           'date'                 => _i('Das Feld ":attribute" beinhaltet ein ungültiges Datum.'),
           'date_format'          => _i('Das Feld ":attribute" beinhaltet ein ungültiges Datumsformat.'),
           'different'            => _i('Das Feld ":attribute" muss einen anderen Wert als :other haben.'),
           'digits'               => _i('":attribute" muss aus Ziffern bestehen'),
           'digits_between'       => _i('":attribute" muss zwschen :min und :max Ziffern bestehen'),
           'dimensions'           => _i('":attribute" hat eine fehlerhafte Bildgröße.'),
           'distinct'             => _i('":attribute" hat gleichen Inhalt'),
           'email'                => _i('":attribute" muss eine gültige E-Mail Adresse enthalten.'),
           'exists'               => _i('Die Auswahl ":attribute" ist ungülgtig'),
           'file'                 => _i('":attribute" muss eine Datei sein.'),
           'filled'               => _i('":attribute" muss einen Wert haben.'),
           'image'                => _i('":attribute" muss ein Bild sein.'),
           'in'                   => _i('Die Auswahl ":attribute" ist ungülgtig'),
           'in_array'             => _i('":attribute" existiert nicht in ":other".'),
           'integer'              => _i('":attribute" muss ein Zahl sein.'),
           'ip'                   => _i('":attribute" muss eine gültige IPv4 Adresse sein.'),
           'ipv4'                 => _i('":attribute" muss eine gültige IPv4 Adresse sein.'),
           'ipv6'                 => _i('":attribute" muss eine gültige IPv6 Adresse sein.'),
           'json'                 => _i('":attribute" muss gültigen JSON-Text enthalten.'),
           'max'                  => [
               'numeric' => _i('":attribute" darf nicht größer als :max sein.'),
               'file'    => _i('":attribute" darf nicht größer als :max Kilobytes sein.'),
               'string'  => _i('":attribute" darf nicht größer als :max Zeichen lang sein.'),
               'array'   => _i('":attribute" darf nicht mehr als :max Element enthalten.'),
           ],
           'mimes'                => _i('":attribute" muss als MIME vom Typ ":values" sein.'),
           'mimetypes'            => _i('":attribute" muss als MIME vom Typ ":values" sein.'),
           'min'                  => [
               'numeric' => _i('Das Feld ":attribute" muss mindesten :min Zeichen lang sein.'),
               'file'    => _i('Die Datei muss mindestens :min Kilobytes groß sein.'),
               'string'  => _i('Das Feld ":attribute" muss mindesten :min Zeichen lang sein.'),
               'array'   => _i('Das Feld ":attribute" muss mindesten :min Elemente enthalten.'),
           ],
           'not_in'               => _i('":attribute" is ungültig.'),
           'numeric'              => _i('":attribute" muss eine Zahl sein.'),
           'present'              => _i('":attribute" muss existieren'),
           'regex'                => _i('":attribute" muss gültiges Regex enthalten.'),
           'required'             => _i('Das Feld ":attribute" ist ein Pflichtfeld.'),
           'required_if'          => _i('":attribute" ist erforderlich wenn ":other" den Wert ":value" hat.'),
           'required_unless'      => _i('":attribute" ist erforderlich solange ":other" den Wert ":value" hat.'),
           'required_with'        => _i('":attribute" ist erforderlich solange ":values" existieren.'),
           'required_with_all'    => _i('":attribute" ist erforderlich wenn ":values" existieren.'),
           'required_without'     => _i('":attribute" ist erforderlich wenn ":values" nicht existieren.'),
           'required_without_all' => _i('":attribute" ist erforderlich keines der Felder von ":values" existieren.'),
           'same'                 => _i('Das Feld ":attribute" und ":other" müssen ident sein.'),
           'size'                 => [
               'numeric' => _i('Das Feld ":attribute" muss :size groß sein.'),
               'file'    => _i('Die Datei ":attribute" muss :size Kilobytes groß sein.'),
               'string'  => _i('":attribute" muss :size Zeichen enthalten'),
               'array'   => _i('":attribute" muss :size Element/e enthalten.'),
           ],
           'string'               => _i('":attribute" aus Buchstaben bestehen.'),
           'timezone'             => _i('":attribute" muss eine gültige Zeitzone sein.'),
           'unique'               => _i('":attribute" ist nicht einzigartig.'),
           'uploaded'             => _i('":attribute" konnte nicht hochgeladen werden.'),
           'url'                  => _i('":attribute" ist eine ungültige URL.'),
      ];

    }

}
