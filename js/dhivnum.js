

var th_val = ['', 'ހާސް', 'މިލިޔަން', 'ބިލިޔަން', 'ޓްރިލިޔަން'];
var dg_val = ['ސުން', 'އެއް', 'ދެ', 'ތިން', 'ހަތަރު', 'ފަސް', 'ހަ', 'ހަތް', 'އަށް', 'ނުވަ'];
var twenty = ['ވިހި', 'އެކާވީސް', 'ބާވީސް', 'ތޭވީސް', 'ސައްވީސް', 'ފަންސަވީސް', 'ސައްބީސް', 'ހަތާވީސް', 'އަށާވީސް', 'އޮނަތިރީސް'];
var tn_val = ['ދިހަ', 'އެގާރަ', 'ބާރަ', 'ތޭރަ', 'ސާދަ', 'ފަނަރަ', 'ސޯޅަ', 'ސަތާރަ', 'އަށާރަ', 'އޮނަވިހި'];
var tw_val = ['ވިހި', 'ތިރީސް', 'ސާޅީސް', 'ފަންސާސް', 'ފަސްދޮޅަސް', 'ހަތްދިހަ', 'އަށްޑިހަ', 'ނުވަދިހަ'];

function toWordsconver(s) {

    s = s.toString(); //changing input number to a string
    s = s.replace(/[\, ]/g, ''); //removing all spaces
    if (s != parseFloat(s)) return 'not a number '; // check if its a numebr

    s = parseFloat(s).toFixed(2);

    var x_val = s.indexOf('.'); // getting number of digits
    if (x_val == -1) {
        x_val = s.length;
    }
    else {
        s = parseFloat(s).toFixed(2);
    };

    if (x_val > 15) return 'too big';

    var n_val = s.split(''); //number set
    var str_val = '';
    var sk_val = 0;
    var mvr = 0;

    for (var i = 0; i < x_val; i++) {

        if (n_val[i] != 0) { mvr = 1 };

        if ((x_val - i) % 3 == 2) {
            if (n_val[i] == '1') {
                str_val += tn_val[Number(n_val[i + 1])] + ' ';
                i++;
                sk_val = 1;
            }
            else if (n_val[i] == '2') {
                str_val += twenty[Number(n_val[i + 1])] + ' ';
                i++;
                sk_val = 1;
            }
            else if (n_val[i] != 0) {
                str_val += tw_val[n_val[i] - 2] + ' ';
                sk_val = 1;
            }
        } else if (n_val[i] != 0) {
            var dhuisatta = (((x_val - i) % 3 == 0) && (n_val[i] == '2'));
            var vihi = ((n_val[i] != '0') && (n_val[i - 1] == '2')) && dhuisatta;
            var satheyka = (((x_val - i) % 3 == 0) && (n_val[i] == '1')); // kiyagoi
            satheyka = false; // for banking

            if (!dhuisatta && !vihi && !satheyka) {
                str_val += dg_val[n_val[i]] + ' ';
            }

            if ((x_val - i) % 3 == 0) {

                if (n_val[i] == 2) {
                    str_val += 'ދުއިސައްތަ ';
                }
                else str_val += 'ސަތޭކަ ';
            };
            sk_val = 1;
        }

        if ((x_val - i) % 3 == 1) {
            if (sk_val)
                str_val += th_val[(x_val - i - 1) / 3] + ' ';
            sk_val = 0;
        }
    }

    if (mvr) {
        str_val += 'ރުފިޔާ ';
    }

    var no_lari = (n_val[x_val + 1] == '0') && (n_val[x_val + 2] == '0');

    if ((x_val != s.length) && !no_lari) {
        var y_val = s.length;

        for (var i = x_val + 1; i < y_val; i++) {

            if (n_val[i] == '0') {
                str_val += dg_val[n_val[i + 1]] + ' ';
                i++;
            }
            else if (n_val[i] == '1') {
                str_val += tn_val[Number(n_val[i + 1])] + ' ';
                i++;

            }
            else if (n_val[i] == '2') {
                str_val += twenty[Number(n_val[i + 1])] + ' ';
                i++;

            }
            else if (n_val[i] != 0) {
                str_val += tw_val[n_val[i] - 2] + ' ';

                if (n_val[i + 1] != 0) {
                    str_val += dg_val[n_val[i + 1]] + ' ';
                    i++;
                }
                else i++;
            }
        }

        str_val += 'ލާރި ';
    }
    return str_val.replace(/\s+/g, ' ');
}


function asus(x) {
    // alert();
    var cnum = document.getElementById("word").value;
    // console.log(cnum);
    cnum = parseFloat(cnum).toFixed(2);
    var inwords = toWordsconver(cnum);
    // cnum = cnum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    document.getElementById("word").value = cnum;
    // console.log(inwords);
    document.getElementById("numberInWords").innerHTML = inwords;
    if (x == 1) {
        var copyRF = document.createElement("textarea");
        document.body.appendChild(copyRF);
        copyRF.value = inwords;
        copyRF.select();
        copyRF.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.body.removeChild(copyRF);

    }
}


