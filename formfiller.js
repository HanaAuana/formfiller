var identifyField = function(sel){
  hide = sel.className.indexOf('hide');
  if (hide !== -1){
    return ["hide"]
  }
  total = sel.className.indexOf('total');
  if (total !== -1){
    return ["total"]
  }
  section = sel.className.indexOf('section');
  if (section !== -1){
    return ["section"]
  }
  pagingContext = sel.className.indexOf('paging-context');
  if (pagingContext !== -1){
    return ["paging-context"]
  }
  buttons = sel.className.indexOf('buttons');
  if (buttons !== -1){
    return ["buttons"]
  }
  div = document.evaluate('div', sel, null).iterateNext();
  multi = document.evaluate('fieldset/div', sel).iterateNext();
  if(multi){
    checks = document.evaluate('*/input[@type="checkbox"]/@id', multi);
    checks_temp = checks.iterateNext();
    if(checks_temp){
      checks_list = [checks_temp.textContent];
      next_label = checks.iterateNext();
      while(next_label){
        checks_list.push(next_label.textContent);
        next_label = checks.iterateNext();
      }
      check_labels = document.evaluate('*/input[@type="checkbox"]/@value', multi);
      labels_temp = check_labels.iterateNext();
      labels_list = [labels_temp.textContent];
      next_label = check_labels.iterateNext();
      while(next_label){
        labels_list.push(next_label.textContent);
        next_label = check_labels.iterateNext();
      }
      check_title = document.evaluate('fieldset/legend/text()', sel).iterateNext().textContent;
      return ["check", check_title, checks_list, labels_list];
    }
    radio_temp = document.evaluate('*/input[@type="radio"]/@id', multi);
    radio = radio_temp.iterateNext();
    if(radio){
      radio_subs = [radio.textContent];
      next_sub = radio_temp.iterateNext();
      while(next_sub){
        radio_subs.push(next_sub.textContent);
        next_sub = radio_temp.iterateNext();
      }

      radio_title = document.evaluate('fieldset/legend/text()', sel).iterateNext().textContent;
      radio_labels = document.evaluate('*/input[@type="radio"]/@value', multi);
      radio_list = [];
      radio_temp = radio_labels.iterateNext();
      while(radio_temp){
        radio_list.push(radio_temp.textContent);
        radio_temp = radio_labels.iterateNext();
      }
      radio = document.evaluate('*/input[@type="radio"]/@name', multi).iterateNext().textContent;
      return ["radio", radio_title, radio, radio_subs, radio_list];
    }
    rating = multi.className.indexOf('rating');
    if (rating !== -1){
      rating_title = document.evaluate('fieldset/legend/text()', sel).iterateNext().textContent;
      rating = document.evaluate('input/@id', multi).iterateNext().textContent;
      return ["rating", rating_title, rating];
    }
  }
  else if(div){
    file_up = document.evaluate('input[@type="file"]/@id', div, null).iterateNext();
    if(file_up){
      file_up = file_up.textContent;
      file_title = document.evaluate('label/text()', sel).iterateNext().textContent;
      return ["file", file_title, file_up];
    }
    email = document.evaluate('input[@type="email"]/@id', div).iterateNext();
    if(email){
      email = email.textContent;
      email_title = document.evaluate('label/text()', sel).iterateNext().textContent;
      return ["email", email_title, email];
    }
    website = document.evaluate('input[@type="url"]/@id', div).iterateNext();
    if (website){
      website = website.textContent;
      website_title = document.evaluate('label/text()', sel).iterateNext().textContent;
      return ["website", website_title, website];
    }
    addr = document.evaluate('span[contains(@class, "addr1")]', div).iterateNext();
    if(addr){
      addr_label = document.evaluate('label/text()', sel).iterateNext().textContent;
      addr_subs = [];
      addr_temp = document.evaluate('span/input/@name', div);
      next_sub = addr_temp.iterateNext();
      while(next_sub){
        addr_subs.push(next_sub.textContent);
        next_sub = addr_temp.iterateNext();
      }
      addr_country = document.evaluate('span[contains(@class, "country")]/select/@id', div).iterateNext().textContent;
      addr_subs.push(addr_country);
      return ["addr", addr_label, addr_subs];
    }
    drop = document.evaluate('select', div).iterateNext();
    if (drop){
      drop_title = document.evaluate('label/text()', sel).iterateNext().textContent;
      drop_labels = [];
      drop_temp = document.evaluate('option/@value', drop);
      next_label = drop_temp.iterateNext();
      while(next_label){
        drop_labels.push(next_label.textContent);
        next_label = drop_temp.iterateNext();
      }
      drop = document.evaluate('@id', drop).iterateNext().textContent;
      return ["drop", drop_title, drop, drop_labels];
    }
    paragraph = document.evaluate('textarea/@id', div).iterateNext();
    if(paragraph){
      paragraph = paragraph.textContent;
      label = document.evaluate('label/text()', sel).iterateNext().textContent;
      return ["para", label, paragraph];
    }
    number = document.evaluate('input[contains(@class, "nospin")]/@id', div).iterateNext();
    if (number){
      number = number.textContent;
      number_title = document.evaluate('label/text()', sel).iterateNext().textContent;
      return ["number", number_title, number];
    }
    text = document.evaluate('input/@id', div).iterateNext().textContent;
    if(text){
      label = document.evaluate('label/text()', sel).iterateNext().textContent;
      return ["text", label, text];
    }
  }
  else{
    likert = sel.className.indexOf('likert');
    if (likert !== -1){
      likert_label = document.evaluate('table/caption/text()', sel).iterateNext().textContent;
      likert_cols = document.evaluate('table/thead/tr/td', sel);
      cols_list = [];
      cols_temp = likert_cols.iterateNext();
      while(cols_temp){
        cols_list.push(cols_temp.textContent);
        cols_temp = likert_cols.iterateNext();
      }
      likert_rows = document.evaluate('table/tbody/tr/th/label/text()', sel);
      rows_list = [];
      rows_temp = likert_rows.iterateNext();
      while(rows_temp){
        rows_list.push(rows_temp.textContent);
        rows_temp = likert_rows.iterateNext();
      }
      likert_rows_id = document.evaluate('table/tbody/tr/td/input/@id', sel);
      rows_id_list = [];
      rows_id_temp = likert_rows_id.iterateNext();
      while(rows_id_temp){
        rows_id_list.push(rows_id_temp.textContent);
        rows_id_temp = likert_rows_id.iterateNext();
      }
      return ["likert", likert_label, cols_list, rows_list, rows_id_list];
    }
    date = sel.className.indexOf('date');
    if(date !== -1){
      date_title = document.evaluate('label/text()', sel, null).iterateNext().textContent;
      date_subs = [];
      date_temp = document.evaluate('span/input/@id', sel, null);
      next_sub = date_temp.iterateNext();
      while(next_sub){
        date_subs.push(next_sub.textContent);
        next_sub = date_temp.iterateNext();
      }
      date = document.evaluate('label/@for', sel, null).iterateNext().textContent;
      return ["date", date_title, date, date_subs];
    }
    time = sel.className.indexOf('time');
    if(time !== -1){
      time_title = document.evaluate('label/text()', sel).iterateNext().textContent;
      time_sub = document.evaluate('span/input/@id', sel);
      time_subs = [];
      next_sub = time_sub.iterateNext();
      while(next_sub){
        time_subs.push(next_sub.textContent);
        next_sub = time_sub.iterateNext();
      }
      time = document.evaluate('label/@for', sel).iterateNext().textContent;
      return ["time", time_title, time, time_subs];
    }
    phone = sel.className.indexOf('phone');
    if(phone !== -1){
      phone_title = document.evaluate('label/text()', sel).iterateNext().textContent;
      phone_sub = document.evaluate('span/input/@id', sel);
      phone_subs = [];
      next_sub = phone_sub.iterateNext();
      while(next_sub){
        phone_subs.push(next_sub.textContent);
        next_sub = phone_sub.iterateNext();
      }
      phone = document.evaluate('label/@for', sel).iterateNext().textContent;
      return ["phone", phone_title, phone,  phone_subs];
    }
    price = document.evaluate('span/input[contains(@class, "currency")]', sel).iterateNext();
    if (price){
      price_title = document.evaluate('label/text()', sel).iterateNext().textContent;
      price = document.evaluate('span/input[contains(@class, "nospin")]/@id', sel).iterateNext().textContent;
      return ["price", price_title, price];
    }
    name = document.evaluate('span/input[contains(@class, "fn") or contains(@class, "ln")]', sel).iterateNext();
    if(name){
      name_title = document.evaluate('label/text()', sel).iterateNext().textContent;
      f_name = document.evaluate('span/input[contains(@class, "fn")]/@id', sel).iterateNext().textContent;
      l_name = document.evaluate('span/input[contains(@class, "ln")]/@id', sel).iterateNext().textContent;
      return ["name", name_title, f_name, l_name];
    }
  }  
};

var fillFields = function(field){
  type = field[0];
  switch(type){
    case "hide":
    break;
    case "total":
    break;
    case "section":
    break;
    case "buttons":
    break;
    case "paging-context":
    break;
    case "text":
      fieldID = field[2];
      fillFieldByID(fieldID, 'Wufoo Test');
    break;
    case "number":
      fieldID = field[2];
      fillFieldByID(fieldID, 42);
    break;
    case "para":
      fieldID = field[2];
      fillFieldByID(fieldID, 'Wufoo Test');
    break;
    case "check":
      fieldID = field[2][0];
      val = field[3][0];
      document.getElementById(fieldID).checked = true;
      fillFieldByID(fieldID, val);
    break;
    case "radio":
      fieldID = field[3][0];
      val = field[4][0];
      document.getElementById(fieldID).checked = true;
      fillFieldByID(fieldID, val);
    break;
    case "drop":
      fieldID = field[2];
      if(field[3].length === 1){
        val = field[3][0];
      }
      else{
        val = field[3][1];
      }
      fillFieldByID(fieldID, val);
    break;
    case "name":
      fieldID_f = field[2];
      fieldID_l = field[3];
      fillFieldByID(fieldID_f, 'Wufoo');
      fillFieldByID(fieldID_l, 'Test');
    break;
    case "file":
    break;
    case "addr":
      fieldID_st1 = field[2][0];
      fieldID_st2 = field[2][1];
      fieldID_city = field[2][2];
      fieldID_state = field[2][3];
      fieldID_zip = field[2][4];
      fieldID_country = field[2][5];
      fillFieldByID(fieldID_st1, '101 Lytton Ave');
      fillFieldByID(fieldID_st2, '');
      fillFieldByID(fieldID_city, 'Palo Alto');
      fillFieldByID(fieldID_state, 'CA');
      fillFieldByID(fieldID_zip, 94301);
      fillFieldByID(fieldID_country, 'United States');
    break;
    case "date":
      fieldID_y = field[3][2];
      fieldID_m = field[3][0];
      fieldID_d = field[3][1];
      fillFieldByID(fieldID_y, '2014');
      fillFieldByID(fieldID_m, '06');
      fillFieldByID(fieldID_d, '09');
    break;
    case "email":
      fieldID = field[2];
      fillFieldByID(fieldID, 'test@wufoo.com');
    break;
    case "time":
      fieldID_hh = field[3][2];
      fieldID_mm = field[3][1];
      fieldID_ss = field[3][0];
      fillFieldByID(fieldID_hh, '01');
      fillFieldByID(fieldID_mm, '02');
      fillFieldByID(fieldID_ss, '03');
    break;
    case "phone":
      fieldID_area = field[3][0];
      fieldID_pre = field[3][1];
      fieldID_suf = field[3][2];
      fillFieldByID(fieldID_area, '808');
      fillFieldByID(fieldID_pre, '867');
      fillFieldByID(fieldID_suf, '5309');
    break;
    case "website":
      fieldID = field[2];
      fillFieldByID(fieldID, 'https://wufoo.com');
    break;
    case "price":
      fieldID = field[2];
      fillFieldByID(fieldID, '42');
    break;
    case "likert":
      rows = field[3];
      cols = field[2].length;
      for(var i = 0; i < rows.length; i ++){
        fieldID = field[4][i*cols];
        val = field[2][0];
        document.getElementById(fieldID).checked = true;
        fillFieldByID(fieldID, val);
      }
    break;
    case "rating":
      fieldID = field[2];
      fillFieldByID(fieldID, 5);
    break;
    default:
    break;
  }
};

var fillFieldByID = function(elemID, value){
  document.getElementById(elemID).value=value;
};

var scrapeAndFill = function(){
  var wufooForm = document.evaluate('//form[contains(@class, "wufoo")]', document).iterateNext();
  var fields = document.evaluate('//ul/li', wufooForm);

  var sel = fields.iterateNext();
  var identifiedFields = [];
  while(sel){
    var fieldID = document.evaluate('@id', sel, null).iterateNext();
    var isPaging = sel.className.indexOf('paging-context');
    var total = sel.className.indexOf('total');
    if(total !== -1){
      sel = fields.iterateNext();
    }
    else if(isPaging !== -1){
      sel = fields.iterateNext();
    }
    else if(fieldID){
      fieldID = fieldID.textContent;
      identified = identifyField(sel);
      identifiedFields.push(identified);
      sel = fields.iterateNext();
    }
    else{
      break;
    }
  }
  for(var i = 0; i < identifiedFields.length; i++){
    fillFields(identifiedFields[i]);
  }
};

scrapeAndFill();
