/**
 * data_4_8.js — Survey questions for Decks 4–8 (trilingual EN/HI/BN)
 * Deck 4: Nutrition, Deck 5: Under-5 Health, Deck 6: Obstetric History
 * Deck 7: Individual Health, Deck 7A: Adolescent, Deck 7B: Geriatric, Deck 8: Actions
 */

const _D = (en, hi, bn) => ({ en, hi, bn });
const yesNo = [
  { value:'yes', label: _D('Yes','हाँ','হ্যাঁ') },
  { value:'no',  label: _D('No','नहीं','না') },
];

// ─────────────────────────────────────────
// DECK 4 — NUTRITION & DIET SURVEY
// ─────────────────────────────────────────
const DECK4 = [
  { id:'d4_h1', deck:'4', section:'general', type:'heading',
    label: _D('General Information', 'सामान्य जानकारी', 'সাধারণ তথ্য') },

  { id:'d4_household_no', deck:'4', section:'general', type:'text',
    label: _D('Household Number', 'घर नंबर', 'পরিবার নম্বর') },

  { id:'d4_respondent_name', deck:'4', section:'general', type:'text',
    label: _D('Name of Respondent', 'उत्तरदाता का नाम', 'উত্তরদাতার নাম') },

  { id:'d4_village', deck:'4', section:'general', type:'text',
    label: _D('Village / Area', 'गाँव / क्षेत्र', 'গ্রাম / এলাকা') },

  { id:'d4_district', deck:'4', section:'general', type:'text',
    label: _D('District', 'जिला', 'জেলা') },

  { id:'d4_kitchen_garden', deck:'4', section:'general', type:'radio',
    label: _D('Home / Kitchen Garden exists?', 'घर / किचन गार्डन है?', 'বাড়িতে কিচেন গার্ডেন আছে?'),
    options: yesNo },

  { id:'d4_h2_members', deck:'4', section:'members', type:'heading',
    label: _D('Family Members for Diet Survey', 'आहार सर्वे के लिए परिवार के सदस्य', 'পুষ্টি জরিপের জন্য পরিবারের সদস্য') },

  { id:'d4_members_table', deck:'4', section:'members', type:'table',
    label: _D('Family Members (for diet survey)', 'परिवार के सदस्य (आहार सर्वे)', 'পরিবারের সদস্যরা (পুষ্টি জরিপ)'),
    addRowLabel: _D('Add Member','सदस्य जोड़ें','সদস্য যোগ করুন'),
    columns: [
      { key:'name',       label: _D('Name','नाम','নাম'),         type:'text' },
      { key:'age_sex',    label: _D('Age/Sex','आयु/लिंग','বয়স/লিঙ্গ'), type:'text' },
      { key:'physio',     label: _D('Physiological Status','दैहिक अवस्था','দৈহিক অবস্থা'), type:'select',
        options:[
          {value:'npnl',        label:_D('NPNL (Non-pregnant Non-lactating)','NPNL','NPNL')},
          {value:'preg_t1',     label:_D('Pregnant 1st Trimester (0-3m)','गर्भ 1-3 माह','গর্ভ ১ম ত্রৈমাসিক')},
          {value:'preg_t2',     label:_D('Pregnant 2nd Trimester (3-6m)','गर्भ 3-6 माह','গর্ভ ২য় ত্রৈমাসিক')},
          {value:'preg_t3',     label:_D('Pregnant 3rd Trimester (6-9m)','गर्भ 6-9 माह','গর্ভ ৩য় ত্রৈমাসিক')},
          {value:'lact_1',      label:_D('Lactating I (0-6m)','स्तनपान I','স্তন্যদান I')},
          {value:'lact_2',      label:_D('Lactating II (7-12m)','स्तनपान II','স্তন্যদান II')},
          {value:'child',       label:_D('Child (<5 yrs)','बच्चा','শিশু')},
          {value:'adolescent',  label:_D('Adolescent','किशोर','কিশোর')},
        ]},
      { key:'education',  label: _D('Education','शिक्षा','শিক্ষা'),   type:'text' },
      { key:'occupation', label: _D('Occupation','व्यवसाय','পেশা'), type:'text' },
      { key:'activity',   label: _D('Physical Activity','शारीरिक गतिविधि','শারীরিক কার্যকলাপ'), type:'select',
        options:[
          {value:'sw', label:_D('Sedentary (SW)','निष्क्रिय','নিষ্ক্রিয়')},
          {value:'mw', label:_D('Moderate (MW)','मध्यम','মাঝারি')},
          {value:'hw', label:_D('Heavy (HW)','भारी','ভারী')},
        ]},
      { key:'income',     label: _D('Monthly Income (₹)','मासिक आय (₹)','মাসিক আয় (₹)'), type:'number' },
    ]},

  { id:'d4_h3_recall', deck:'4', section:'food_recall', type:'heading',
    label: _D('3-Day Food Intake Recall (grams per day)', '3-दिन आहार recall (ग्राम प्रति दिन)', '৩ দিনের খাদ্য তালিকা (গ্রাম/দিন)') },

  // ── CEREALS ──
  { id:'d4_cereals', deck:'4', section:'food_recall', type:'table',
    label: _D('A. Cereals', 'A. अनाज', 'A. শস্য'),
    addRowLabel: _D('Add item','मद जोड़ें','মদ যোগ করুন'),
    columns: [
      { key:'food',   label: _D('Food Item','खाद्य पदार्थ','খাদ্য বস্তু'),    type:'text' },
      { key:'day1',   label: _D('Day 1 (g)','दिन 1 (ग्र)','দিন ১ (গ্র)'),     type:'number' },
      { key:'day2',   label: _D('Day 2 (g)','दिन 2 (ग्र)','দিন ২ (গ্র)'),     type:'number' },
      { key:'day3',   label: _D('Day 3 (g)','दिन 3 (ग्र)','দিন ৩ (গ্র)'),     type:'number' },
      { key:'avg',    label: _D('Average (g)','औसत (ग्र)','গড় (গ্র)'),         type:'number' },
    ]},

  // ── PULSES ──
  { id:'d4_pulses', deck:'4', section:'food_recall', type:'table',
    label: _D('B. Pulses & Legumes', 'B. दालें और फलियाँ', 'B. ডাল ও শিম'),
    addRowLabel: _D('Add item','मद जोड़ें','মদ যোগ করুন'),
    columns: [
      { key:'food', label: _D('Food Item','खाद्य पदार्थ','খাদ্য বস্তু'), type:'text' },
      { key:'day1', label: _D('Day 1 (g)','दिन 1 (ग्र)','দিন ১ (গ্র)'), type:'number' },
      { key:'day2', label: _D('Day 2 (g)','दिन 2 (ग्र)','দিন ২ (গ্র)'), type:'number' },
      { key:'day3', label: _D('Day 3 (g)','दिन 3 (ग्र)','দিন ৩ (গ্র)'), type:'number' },
      { key:'avg',  label: _D('Average (g)','औसत','গড়'), type:'number' },
    ]},

  // ── ROOT VEGETABLES ──
  { id:'d4_root_veg', deck:'4', section:'food_recall', type:'table',
    label: _D('C. Root Vegetables', 'C. जड़ वाली सब्जियाँ', 'C. মূলযুক্ত সবজি'),
    addRowLabel: _D('Add item','मद जोड़ें','মদ যোগ করুন'),
    columns: [
      { key:'food', label: _D('Food Item','खाद्य पदार्थ','খাদ্য বস্তু'), type:'text' },
      { key:'day1', label: _D('Day 1 (g)','दिन 1 (ग्र)','দিন ১ (গ্র)'), type:'number' },
      { key:'day2', label: _D('Day 2 (g)','दिन 2 (ग्र)','দিন ২ (গ্র)'), type:'number' },
      { key:'day3', label: _D('Day 3 (g)','दिन 3 (ग्र)','দিন ৩ (গ্র)'), type:'number' },
      { key:'avg',  label: _D('Average (g)','औसत','গড়'), type:'number' },
    ]},

  // ── LEAFY VEGETABLES ──
  { id:'d4_leafy_veg', deck:'4', section:'food_recall', type:'table',
    label: _D('D. Leafy Vegetables', 'D. पत्तेदार सब्जियाँ', 'D. পাতাজাতীয় সবজি'),
    addRowLabel: _D('Add item','मद जोड़ें','মদ যোগ করুন'),
    columns: [
      { key:'food', label: _D('Food Item','खाद्य पदार्थ','খাদ্য বস্তু'), type:'text' },
      { key:'day1', label: _D('Day 1 (g)','दिन 1 (ग्र)','দিন ১ (গ্র)'), type:'number' },
      { key:'day2', label: _D('Day 2 (g)','दिन 2 (ग्र)','দিন ২ (গ্র)'), type:'number' },
      { key:'day3', label: _D('Day 3 (g)','दिन 3 (ग्र)','দিন ৩ (গ্র)'), type:'number' },
      { key:'avg',  label: _D('Average (g)','औसत','গড়'), type:'number' },
    ]},

  // ── OTHER VEGETABLES ──
  { id:'d4_other_veg', deck:'4', section:'food_recall', type:'table',
    label: _D('E. Other Vegetables', 'E. अन्य सब्जियाँ', 'E. অন্যান্য সবজি'),
    addRowLabel: _D('Add item','मद जोड़ें','মদ যোগ করুন'),
    columns: [
      { key:'food', label: _D('Food Item','खाद्य पदार्थ','খাদ্য বস্তু'), type:'text' },
      { key:'day1', label: _D('Day 1 (g)','दिन 1 (ग्र)','দিন ১ (গ্র)'), type:'number' },
      { key:'day2', label: _D('Day 2 (g)','दिन 2 (ग्र)','দিন ২ (গ্র)'), type:'number' },
      { key:'day3', label: _D('Day 3 (g)','दिन 3 (ग्र)','দিন ৩ (গ্র)'), type:'number' },
      { key:'avg',  label: _D('Average (g)','औसत','গড়'), type:'number' },
    ]},

  // ── FATS & OILS ──
  { id:'d4_fats_oils', deck:'4', section:'food_recall', type:'table',
    label: _D('F. Fats & Oils', 'F. वसा और तेल', 'F. চর্বি ও তেল'),
    addRowLabel: _D('Add item','मद जोड़ें','মদ যোগ করুন'),
    columns: [
      { key:'food', label: _D('Food Item','खाद्य पदार्थ','খাদ্য বস্তু'), type:'text' },
      { key:'day1', label: _D('Day 1 (g)','दिन 1 (ग्र)','দিন ১ (গ্র)'), type:'number' },
      { key:'day2', label: _D('Day 2 (g)','दिन 2 (ग्र)','দিন ২ (গ্র)'), type:'number' },
      { key:'day3', label: _D('Day 3 (g)','दिन 3 (ग्র)','দিন ৩ (গ্র)'), type:'number' },
      { key:'avg',  label: _D('Average (g)','औसत','গড়'), type:'number' },
    ]},

  // ── MILK ──
  { id:'d4_milk', deck:'4', section:'food_recall', type:'table',
    label: _D('G. Milk & Milk Products', 'G. दूध और दुग्ध उत्पाद', 'G. দুধ ও দুগ্ধজাত পণ্য'),
    addRowLabel: _D('Add item','मद जोड़ें','মদ যোগ করুন'),
    columns: [
      { key:'food', label: _D('Food Item','खाद्य पदार्थ','খাদ্য বস্তু'), type:'text' },
      { key:'day1', label: _D('Day 1 (g/ml)','दिन 1','দিন ১'), type:'number' },
      { key:'day2', label: _D('Day 2 (g/ml)','दिन 2','দিন ২'), type:'number' },
      { key:'day3', label: _D('Day 3 (g/ml)','दिन 3','দিন ৩'), type:'number' },
      { key:'avg',  label: _D('Average','औसत','গড়'), type:'number' },
    ]},

  // ── FLESH FOODS ──
  { id:'d4_flesh', deck:'4', section:'food_recall', type:'table',
    label: _D('H. Flesh Foods (Egg, Fish, Meat)', 'H. माँसाहार (अंडा, मछली, माँस)', 'H. আমিষ (ডিম, মাছ, মাংস)'),
    addRowLabel: _D('Add item','मद जोड़ें','মদ যোগ করুন'),
    columns: [
      { key:'food', label: _D('Food Item','खाद्य पदार्थ','খাদ্য বস্তু'), type:'text' },
      { key:'day1', label: _D('Day 1 (g)','दिन 1','দিন ১'), type:'number' },
      { key:'day2', label: _D('Day 2 (g)','दिन 2','দিন ২'), type:'number' },
      { key:'day3', label: _D('Day 3 (g)','दिन 3','দিন ৩'), type:'number' },
      { key:'avg',  label: _D('Average (g)','औसत','গড়'), type:'number' },
    ]},

  // ── SUGAR ──
  { id:'d4_sugar', deck:'4', section:'food_recall', type:'table',
    label: _D('I. Sugar & Jaggery', 'I. चीनी और गुड़', 'I. চিনি ও গুড়'),
    addRowLabel: _D('Add item','मद जोड़ें','মদ যোগ করুন'),
    columns: [
      { key:'food', label: _D('Food Item','खाद्य पदार्थ','খাদ্য বস্তু'), type:'text' },
      { key:'day1', label: _D('Day 1 (g)','दिन 1','দিন ১'), type:'number' },
      { key:'day2', label: _D('Day 2 (g)','दिन 2','দিন ২'), type:'number' },
      { key:'day3', label: _D('Day 3 (g)','दिन 3','দিন ৩'), type:'number' },
      { key:'avg',  label: _D('Average (g)','औसत','গড়'), type:'number' },
    ]},

  // ── FRUITS ──
  { id:'d4_fruits', deck:'4', section:'food_recall', type:'table',
    label: _D('J. Fruits & Nuts', 'J. फल और मेवे', 'J. ফল ও বাদাম'),
    addRowLabel: _D('Add item','मद जोड़ें','মদ যোগ করুন'),
    columns: [
      { key:'food', label: _D('Food Item','खाद्य पदार्थ','খাদ্য বস্তু'), type:'text' },
      { key:'day1', label: _D('Day 1 (g)','दिन 1','দিন ১'), type:'number' },
      { key:'day2', label: _D('Day 2 (g)','दिन 2','দিন ২'), type:'number' },
      { key:'day3', label: _D('Day 3 (g)','दिन 3','দিন ৩'), type:'number' },
      { key:'avg',  label: _D('Average (g)','औसत','গড়'), type:'number' },
    ]},

  // ── SALT ──
  { id:'d4_salt_iodised', deck:'4', section:'food_recall', type:'radio',
    label: _D('K. Common Salt — Iodine Content (by test kit)', 'K. नमक — आयोडीन सामग्री (परीक्षण किट द्वारा)', 'K. লবণ — আয়োডিন পরিমাণ (পরীক্ষা কিট দ্বারা)'),
    options: [
      { value:'iodised_low',  label: _D('Iodised < 15 ppm','आयोडीन < 15 ppm','আয়োডিন < ১৫ ppm') },
      { value:'iodised_ok',   label: _D('Iodised ≥ 15 ppm (adequate)','आयोडीन ≥ 15 ppm (पर्याप्त)','আয়োডিন ≥ ১৫ ppm (পর্যাপ্ত)') },
      { value:'non_iodised',  label: _D('Non-iodised','गैर-आयोडीनयुक्त','আয়োডিনহীন') },
    ]},

  { id:'d4_h4_anthro', deck:'4', section:'anthropometry', type:'heading',
    label: _D('Anthropometric Measurements', 'शारीरिक माप', 'দেহ পরিমাপ') },

  { id:'d4_anthro_u5', deck:'4', section:'anthropometry', type:'table',
    label: _D('Under-5 Anthropometry', 'पाँच वर्ष से कम बच्चों का माप', '৫ বছরের কম শিশুর দেহ পরিমাপ'),
    addRowLabel: _D('Add Child','बच्चा जोड़ें','শিশু যোগ করুন'),
    columns: [
      { key:'name',   label: _D('Name/No','नाम/नं.','নাম/নং'), type:'text' },
      { key:'wfa',    label: _D('Weight for Age','वजन/आयु','ওজন/বয়স'),   type:'text' },
      { key:'hfa',    label: _D('Height for Age','ऊंचाई/आयु','উচ্চতা/বয়স'), type:'text' },
      { key:'muac',   label: _D('MUAC (cm)','MUAC (सेमी)','MUAC (সেমি)'), type:'number' },
    ]},

  { id:'d4_anthro_adult', deck:'4', section:'anthropometry', type:'table',
    label: _D('Adult Anthropometry', 'वयस्क शारीरिक माप', 'প্রাপ্তবয়স্ক দেহ পরিমাপ'),
    addRowLabel: _D('Add Person','व्यक्ति जोड़ें','ব্যক্তি যোগ করুন'),
    columns: [
      { key:'name',   label: _D('Name','नाम','নাম'),                  type:'text' },
      { key:'height', label: _D('Height (cm)','ऊंचाई (सेमी)','উচ্চতা (সেমি)'), type:'number' },
      { key:'weight', label: _D('Weight (kg)','वजन (किग्रा)','ওজন (কেজি)'), type:'number' },
      { key:'bmi',    label: _D('BMI','बीएमआई','BMI'),                 type:'number' },
      { key:'waist',  label: _D('Waist Circ. (cm)','कमर (सेमी)','কোমর (সেমি)'), type:'number' },
      { key:'hip',    label: _D('Waist-Hip Ratio','कमर-कूल्हा अनुपात','কোমর-নিতম্ব অনুপাত'), type:'number' },
    ]},

  { id:'d4_clinical_undernutrition', deck:'4', section:'anthropometry', type:'textarea',
    label: _D('Clinical Features of Undernutrition (skin, nail, hair, hepatosplenomegaly, edema, rachitic changes)', 'कुपोषण के नैदानिक लक्षण (त्वचा, नाखून, बाल, यकृत/प्लीहावृद्धि, सूजन, रिकेट्स)', 'অপুষ্টির ক্লিনিকাল লক্ষণ (ত্বক, নখ, চুল, যকৃত/প্লীহা বৃদ্ধি, ফোলা, রিকেটস পরিবর্তন)') },

  { id:'d4_problems', deck:'4', section:'summary', type:'textarea',
    label: _D('Problems Identified (bullet points)', 'समस्याएँ (बिंदुओं में)', 'চিহ্নিত সমস্যা (বুলেট পয়েন্টে)') },
];

// ─────────────────────────────────────────
// DECK 5 — UNDER-5 HEALTH CHECKUP
// ─────────────────────────────────────────
const DECK5 = [
  { id:'d5_h1', deck:'5', section:'id', type:'heading',
    label: _D('Child Identification', 'बच्चे की पहचान', 'শিশু চিহ্নিতকরণ') },

  { id:'d5_serial_no', deck:'5', section:'id', type:'text',
    label: _D('Serial Number of Child', 'बच्चे का क्रम नंबर', 'শিশুর ক্রমিক নম্বর') },

  { id:'d5_age_months', deck:'5', section:'id', type:'number',
    label: _D('Age (in completed months)', 'आयु (पूर्ण महीनों में)', 'বয়স (পূর্ণ মাসে)') },

  { id:'d5_sex', deck:'5', section:'id', type:'radio',
    label: _D('Sex', 'लिंग', 'লিঙ্গ'),
    options: [
      { value:'male',   label: _D('Male','पुरुष','পুরুষ') },
      { value:'female', label: _D('Female','स्त्री','স্ত্রী') },
    ]},

  { id:'d5_chief_complaints', deck:'5', section:'history', type:'textarea',
    label: _D('Chief Complaints', 'मुख्य शिकायतें', 'প্রধান অভিযোগ') },

  { id:'d5_present_illness', deck:'5', section:'history', type:'textarea',
    label: _D('History of Present Illness', 'वर्तमान बीमारी का इतिहास', 'বর্তমান অসুস্থতার ইতিহাস') },

  { id:'d5_h2_birth', deck:'5', section:'birth', type:'heading',
    label: _D('Birth History', 'जन्म इतिहास', 'জন্ম ইতিহাস') },

  { id:'d5_dob', deck:'5', section:'birth', type:'date',
    label: _D('Date of Birth', 'जन्म तिथि', 'জন্ম তারিখ') },

  { id:'d5_birth_weight', deck:'5', section:'birth', type:'number',
    label: _D('Birth Weight (kg)', 'जन्म के समय वजन (किग्रा)', 'জন্মের সময় ওজন (কেজি)') },

  { id:'d5_gestation', deck:'5', section:'birth', type:'radio',
    label: _D('Gestation at Birth', 'प्रसव पर गर्भकाल', 'প্রসবকালীন গর্ভাবস্থা'),
    options: [
      { value:'term',      label: _D('Term (37-42 weeks)','पूर्णकालिक','পূর্ণমেয়াদী') },
      { value:'post_term', label: _D('Post Term (>42 weeks)','बाद में','অধিকমেয়াদী') },
      { value:'pre_term',  label: _D('Pre Term (<37 weeks)','समय से पहले','অকালজাত') },
    ]},

  { id:'d5_delivery_place', deck:'5', section:'birth', type:'radio',
    label: _D('Place of Delivery', 'प्रसव का स्थान', 'প্রসবের স্থান'),
    options: [
      { value:'hospital_govt', label: _D('Government Hospital','सरकारी अस्पताल','সরকারি হাসপাতাল') },
      { value:'hospital_pvt',  label: _D('Private Hospital/Clinic','निजी अस्पताल','বেসরকারি হাসপাতাল') },
      { value:'home',          label: _D('Home','घर','বাড়ি') },
      { value:'other',         label: _D('Other','अन्य','অন্য') },
    ]},

  { id:'d5_birth_attendant', deck:'5', section:'birth', type:'radio',
    label: _D('Birth Attendant', 'प्रसव परिचारक', 'প্রসব সহায়তাকারী'),
    options: [
      { value:'doctor',   label: _D('Doctor','डॉक्टर','ডাক্তার') },
      { value:'nurse',    label: _D('Nurse/Midwife','नर्स/दाई','নার্স/দাই') },
      { value:'dai',      label: _D('Dai (traditional)','दाई (पारंपरिक)','দাই (ঐতিহ্যগত)') },
      { value:'family',   label: _D('Family member','परिवार का सदस्य','পরিবারের সদস্য') },
    ]},

  { id:'d5_delivery_type', deck:'5', section:'birth', type:'radio',
    label: _D('Type of Delivery', 'प्रसव का प्रकार', 'প্রসবের ধরন'),
    options: [
      { value:'normal',   label: _D('Normal / Vaginal','सामान्य','স্বাভাবিক') },
      { value:'caesarean',label: _D('Caesarean (C-section)','सीजेरियन','সিজারিয়ান') },
      { value:'forceps',  label: _D('Forceps/Vacuum assisted','फोर्सेप्स/वैक्यूम','ফোর্সেপ/ভ্যাকুয়াম') },
    ]},

  { id:'d5_past_illness', deck:'5', section:'history', type:'textarea',
    label: _D('History of Significant Past Illness (including congenital diseases)', 'महत्वपूर्ण पिछली बीमारियों का इतिहास (जन्मजात रोग सहित)', 'উল্লেখযোগ্য পুরনো অসুস্থতার ইতিহাস (জন্মগত রোগ সহ)') },

  { id:'d5_h3_feeding', deck:'5', section:'feeding', type:'heading',
    label: _D('Feeding History (24-hour recall)', 'खिलाने का इतिहास (24 घंटे recall)', 'খাওয়ানোর ইতিহাস (২৪ ঘণ্টার recall)') },

  { id:'d5_feeding_type', deck:'5', section:'feeding', type:'radio',
    label: _D('Type of Feeding', 'खिलाने का प्रकार', 'খাওয়ানোর ধরন'),
    options: [
      { value:'exclusive_bf',  label: _D('Exclusive Breastfeeding','केवल स्तनपान','শুধু মাতৃদুগ্ধ') },
      { value:'bf_comp',       label: _D('Breastfeeding + Complementary','स्तनपान + पूरक आहार','মাতৃদুগ্ধ + পরিপূরক') },
      { value:'formula',       label: _D('Formula / Bottle feed','फार्मूला/बोतल','ফর্মুলা/বোতল') },
      { value:'comp_only',     label: _D('Complementary only','केवल पूरक आहार','শুধু পরিপূরক') },
    ]},

  { id:'d5_feeding_amount', deck:'5', section:'feeding', type:'textarea',
    label: _D('Amount and Method of Feeding', 'खिलाने की मात्रा और विधि', 'খাওয়ানোর পরিমাণ ও পদ্ধতি') },

  { id:'d5_feeding_frequency', deck:'5', section:'feeding', type:'text',
    label: _D('Frequency of Feeding (times per day)', 'खिलाने की आवृत्ति (बार प्रति दिन)', 'খাওয়ানোর ফ্রিকোয়েন্সি (দিনে কতবার)'),
    placeholder: _D('e.g. 6 times/day','जैसे 6 बार/दिन','যেমন দিনে ৬ বার') },

  { id:'d5_h4_exam', deck:'5', section:'examination', type:'heading',
    label: _D('Clinical Examination — General Survey', 'नैदानिक परीक्षण — सामान्य सर्वेक्षण', 'ক্লিনিকাল পরীক্ষা — সাধারণ সমীক্ষা') },

  { id:'d5_head_circ', deck:'5', section:'examination', type:'number',
    label: _D('Head Circumference (cm)', 'सिर की परिधि (सेमी)', 'মাথার পরিধি (সেমি)') },

  { id:'d5_chest_circ', deck:'5', section:'examination', type:'number',
    label: _D('Chest Circumference (cm)', 'छाती की परिधि (सेमी)', 'বুকের পরিধি (সেমি)') },

  { id:'d5_muac', deck:'5', section:'examination', type:'number',
    label: _D('Mid-Upper Arm Circumference — MUAC (cm)', 'मध्य-ऊपरी बाँह की परिधि — MUAC (सेमी)', 'মধ্য-উপরি বাহুর পরিধি — MUAC (সেমি)') },

  { id:'d5_weight', deck:'5', section:'examination', type:'number',
    label: _D('Current Weight (kg)', 'वर्तमान वजन (किग्रा)', 'বর্তমান ওজন (কেজি)') },

  { id:'d5_height', deck:'5', section:'examination', type:'number',
    label: _D('Current Height/Length (cm)', 'वर्तमान ऊंचाई/लंबाई (सेमी)', 'বর্তমান উচ্চতা/দৈর্ঘ্য (সেমি)') },

  { id:'d5_pulse', deck:'5', section:'examination', type:'number',
    label: _D('Pulse (beats/min)', 'नाड़ी (धड़कन/मिनट)', 'নাড়ি (বিট/মিনিট)') },

  { id:'d5_bp', deck:'5', section:'examination', type:'text',
    label: _D('Blood Pressure (mmHg)', 'रक्तचाप (mmHg)', 'রক্তচাপ (mmHg)'),
    placeholder: _D('e.g. 90/60','जैसे 90/60','যেমন ৯০/৬০') },

  { id:'d5_resp_rate', deck:'5', section:'examination', type:'number',
    label: _D('Respiratory Rate (breaths/min)', 'श्वसन दर (साँस/मिनट)', 'শ্বাসক্রিয়ার হার (নিঃশ্বাস/মিনিট)') },

  { id:'d5_pallor', deck:'5', section:'examination', type:'radio',
    label: _D('Pallor (paleness — sign of anaemia)', 'पीलापन (रक्तहीनता का संकेत)', 'ফ্যাকাশে ভাব (রক্তশূন্যতার লক্ষণ)'),
    options: [
      { value:'present', label: _D('Present','उपस्थित','আছে') },
      { value:'absent',  label: _D('Absent','अनुपस्थित','নেই') },
    ]},

  { id:'d5_oedema', deck:'5', section:'examination', type:'radio',
    label: _D('Oedema (swelling)', 'सूजन', 'ফোলা (এডিমা)'),
    options: [
      { value:'present', label: _D('Present','उपस्थित','আছে') },
      { value:'absent',  label: _D('Absent','अनुपस्थित','নেই') },
    ]},

  { id:'d5_cyanosis', deck:'5', section:'examination', type:'radio',
    label: _D('Cyanosis (bluish discoloration)', 'नीलिमा (नीला रंग)', 'সায়ানোসিস (নীলাভ রং)'),
    options: [
      { value:'present', label: _D('Present','उपस्थित','আছে') },
      { value:'absent',  label: _D('Absent','अनुपस्थित','নেই') },
    ]},

  { id:'d5_jaundice', deck:'5', section:'examination', type:'radio',
    label: _D('Jaundice (yellowing)', 'पीलिया', 'জন্ডিস (হলদে ভাব)'),
    options: [
      { value:'present', label: _D('Present','उपस्थित','আছে') },
      { value:'absent',  label: _D('Absent','अनुपस्थित','নেই') },
    ]},

  { id:'d5_clubbing', deck:'5', section:'examination', type:'radio',
    label: _D('Clubbing (finger tips)', 'क्लबिंग (उंगलियों का मोटापन)', 'ক্লাবিং (আঙুলের মাথা মোটা)'),
    options: [
      { value:'present', label: _D('Present','उपस्थित','আছে') },
      { value:'absent',  label: _D('Absent','अनुपस्थित','নেই') },
    ]},

  { id:'d5_systemic_exam', deck:'5', section:'examination', type:'textarea',
    label: _D('Systemic Examination findings', 'प्रणालीगत परीक्षण निष्कर्ष', 'সিস্টেমিক পরীক্ষার ফলাফল') },

  { id:'d5_investigations', deck:'5', section:'examination', type:'textarea',
    label: _D('Investigations (if any)', 'जाँच (यदि कोई हो)', 'পরীক্ষা-নিরীক্ষা (যদি থাকে)') },

  { id:'d5_growth_chart', deck:'5', section:'examination', type:'textarea',
    label: _D('Growth Chart Features', 'विकास चार्ट की विशेषताएँ', 'বৃদ্ধি চার্টের বৈশিষ্ট্য') },

  { id:'d5_dev_milestones', deck:'5', section:'examination', type:'textarea',
    label: _D('Developmental Milestones (Trivandrum Development Rating Scale)', 'विकास के पड़ाव (त्रिवेंद्रम विकास रेटिंग स्केल)', 'বিকাশের মাইলফলক (ত্রিবান্দ্রম ডেভেলপমেন্ট রেটিং স্কেল)') },

  { id:'d5_h5_immunization', deck:'5', section:'immunization', type:'heading',
    label: _D('Immunization Status', 'टीकाकरण की स्थिति', 'টিকাকরণের অবস্থা') },

  { id:'d5_immunization_table', deck:'5', section:'immunization', type:'table',
    label: _D('Vaccines Received', 'प्राप्त टीके', 'প্রাপ্ত টিকা'),
    addRowLabel: _D('Add Vaccine','टीका जोड़ें','টিকা যোগ করুন'),
    columns: [
      { key:'vaccine',  label: _D('Vaccine Name','टीके का नाम','টিকার নাম'),       type:'text' },
      { key:'age',      label: _D('Age at Vaccination','टीके के समय उम्र','টিকার সময় বয়স'), type:'text' },
      { key:'source',   label: _D('Where obtained','कहाँ से','কোথা থেকে'),          type:'text' },
    ]},

  { id:'d5_adverse_reaction', deck:'5', section:'immunization', type:'radio',
    label: _D('Any adverse reaction following immunization?', 'टीकाकरण के बाद कोई प्रतिकूल प्रतिक्रिया?', 'টিকার পর কোনো বিরূপ প্রতিক্রিয়া?'),
    options: yesNo },

  { id:'d5_adverse_details', deck:'5', section:'immunization', type:'textarea',
    label: _D('Details of adverse reaction', 'प्रतिकूल प्रतिक्रिया का विवरण', 'বিরূপ প্রতিক্রিয়ার বিবরণ'),
    conditional: { field:'d5_adverse_reaction', value:'yes' } },

  { id:'d5_non_immunization_reasons', deck:'5', section:'immunization', type:'textarea',
    label: _D('Reasons for non-immunization / partial immunization', 'टीकाकरण न होने / आंशिक टीकाकरण के कारण', 'টিকা না পাওয়া / আংশিক টিকার কারণ') },

  { id:'d5_summary', deck:'5', section:'summary', type:'textarea',
    label: _D('Summary of the Case', 'मामले का सारांश', 'মামলার সারসংক্ষেপ') },

  { id:'d5_management', deck:'5', section:'summary', type:'textarea',
    label: _D('Treatment and Management', 'उपचार और प्रबंधन', 'চিকিৎসা ও ব্যবস্থাপনা') },
];

// ─────────────────────────────────────────
// DECK 6 — OBSTETRIC HISTORY
// ─────────────────────────────────────────
const DECK6 = [
  { id:'d6_serial_no', deck:'6', section:'id', type:'text',
    label: _D('Serial Number', 'क्रम नंबर', 'ক্রমিক নম্বর') },

  { id:'d6_mother_name', deck:'6', section:'id', type:'text',
    label: _D('Mother\'s Name', 'माँ का नाम', 'মায়ের নাম') },

  { id:'d6_age', deck:'6', section:'id', type:'number',
    label: _D('Age (years)', 'आयु (वर्ष)', 'বয়স (বছর)') },

  { id:'d6_age_marriage', deck:'6', section:'id', type:'number',
    label: _D('Age at Marriage (years)', 'विवाह के समय आयु (वर्ष)', 'বিবাহের সময় বয়স (বছর)') },

  { id:'d6_parity', deck:'6', section:'id', type:'number',
    label: _D('Parity (number of pregnancies/deliveries)', 'पारिटी (प्रसव की संख्या)', 'প্যারিটি (প্রসবের সংখ্যা)') },

  { id:'d6_chief_complaint', deck:'6', section:'history', type:'textarea',
    label: _D('Chief Complaint', 'मुख्य शिकायत', 'প্রধান অভিযোগ') },

  { id:'d6_present_illness', deck:'6', section:'history', type:'textarea',
    label: _D('History of Present Illness', 'वर्तमान बीमारी का इतिहास', 'বর্তমান অসুস্থতার ইতিহাস') },

  { id:'d6_h2_menstrual', deck:'6', section:'menstrual', type:'heading',
    label: _D('Menstrual History', 'मासिक धर्म इतिहास', 'ঋতু ইতিহাস') },

  { id:'d6_menarche_age', deck:'6', section:'menstrual', type:'number',
    label: _D('Age at Menarche (first period) (years)', 'मासिक धर्म शुरू होने की उम्र (वर्ष)', 'প্রথম মাসিকের বয়স (বছর)') },

  { id:'d6_menstruation_regular', deck:'6', section:'menstrual', type:'radio',
    label: _D('Menstruation pattern', 'मासिक धर्म का प्रकार', 'মাসিকের ধরন'),
    options: [
      { value:'regular',   label: _D('Regular','नियमित','নিয়মিত') },
      { value:'irregular', label: _D('Irregular','अनियमित','অনিয়মিত') },
      { value:'absent',    label: _D('Absent (amenorrhoea)','अनुपस्थित','অনুপস্থিত') },
    ]},

  { id:'d6_volume', deck:'6', section:'menstrual', type:'radio',
    label: _D('Volume of menstrual flow', 'मासिक प्रवाह की मात्रा', 'মাসিক প্রবাহের পরিমাণ'),
    options: [
      { value:'normal',  label: _D('Normal','सामान्य','স্বাভাবিক') },
      { value:'scanty',  label: _D('Scanty (very little)','कम','কম') },
      { value:'heavy',   label: _D('Heavy (excessive)','अधिक','অতিরিক্ত') },
    ]},

  { id:'d6_duration', deck:'6', section:'menstrual', type:'text',
    label: _D('Duration of period (days)', 'मासिक धर्म की अवधि (दिन)', 'মাসিকের স্থায়িত্ব (দিন)'),
    placeholder: _D('e.g. 4-5 days','जैसे 4-5 दिन','যেমন ৪-৫ দিন') },

  { id:'d6_periodicity', deck:'6', section:'menstrual', type:'text',
    label: _D('Periodicity / Cycle length (days)', 'चक्र की लंबाई (दिन)', 'চক্রের দৈর্ঘ্য (দিন)'),
    placeholder: _D('e.g. 28 days','जैसे 28 दिन','যেমন ২৮ দিন') },

  { id:'d6_lmp', deck:'6', section:'menstrual', type:'date',
    label: _D('LMP — Last Menstrual Period (for pregnant women)', 'अंतिम मासिक धर्म (गर्भवती महिलाओं के लिए)', 'শেষ মাসিক তারিখ (গর্ভবতীদের জন্য)') },

  { id:'d6_edd', deck:'6', section:'menstrual', type:'date',
    label: _D('EDD — Expected Date of Delivery (for pregnant women)', 'अनुमानित प्रसव तिथि (गर्भवती के लिए)', 'প্রত্যাশিত প্রসবের তারিখ (গর্ভবতীদের জন্য)') },

  { id:'d6_menstrual_comments', deck:'6', section:'menstrual', type:'textarea',
    label: _D('Comments on Menstrual History', 'मासिक धर्म इतिहास पर टिप्पणी', 'ঋতু ইতিহাসের মন্তব্য') },

  { id:'d6_h3_obstetric', deck:'6', section:'obstetric', type:'heading',
    label: _D('Previous Pregnancy History', 'पिछली गर्भावस्था का इतिहास', 'পূর্ববর্তী গর্ভাবস্থার ইতিহাস') },

  { id:'d6_preg_history_table', deck:'6', section:'obstetric', type:'table',
    label: _D('History of Previous Pregnancies (including abortions)', 'पिछली गर्भावस्थाओं का इतिहास (गर्भपात सहित)', 'পূর্ববর্তী গর্ভাবস্থার ইতিহাস (গর্ভপাত সহ)'),
    addRowLabel: _D('Add Pregnancy','गर्भावस्था जोड़ें','গর্ভাবস্থা যোগ করুন'),
    columns: [
      { key:'order',       label: _D('Order','क्रम','ক্রম'),                     type:'number' },
      { key:'age',         label: _D('Age at Pregnancy','गर्भावस्था में उम्र','গর্ভের সময় বয়স'), type:'number' },
      { key:'outcome',     label: _D('Outcome','परिणाम','ফলাফল'),                type:'select',
        options:[
          {value:'live_birth', label:_D('Live Birth','जीवित जन्म','জীবিত জন্ম')},
          {value:'stillbirth', label:_D('Stillbirth','मृत जन्म','মৃত জন্ম')},
          {value:'abortion',   label:_D('Abortion','गर्भपात','গর্ভপাত')},
        ]},
      { key:'delivery_type', label: _D('Type of Delivery','प्रसव का प्रकार','প্রসবের ধরন'), type:'select',
        options:[
          {value:'normal',    label:_D('Normal','सामान्य','স্বাভাবিক')},
          {value:'caesarean', label:_D('Caesarean','सीजेरियन','সিজারিয়ান')},
          {value:'assisted',  label:_D('Assisted (forceps/vacuum)','सहायक','সহায়তাযুক্ত')},
          {value:'na',        label:_D('N/A (abortion)','लागू नहीं','প্রযোজ্য নয়')},
        ]},
      { key:'place',         label: _D('Place of Delivery','प्रसव का स्थान','প্রসবের স্থান'), type:'text' },
      { key:'conducted_by',  label: _D('Conducted by','किसने किया','কে করেছে'),    type:'text' },
      { key:'complications', label: _D('Complications (if any)','जटिलताएँ','জটিলতা'), type:'text' },
    ]},

  { id:'d6_medical_illness', deck:'6', section:'history', type:'textarea',
    label: _D('Relevant Medical Illness', 'संबंधित चिकित्सा बीमारी', 'প্রাসঙ্গিক চিকিৎসা অসুস্থতা') },

  { id:'d6_abdominal_op', deck:'6', section:'history', type:'radio',
    label: _D('Any Abdominal Operation?', 'कोई पेट का ऑपरेशन?', 'কোনো পেটের অপারেশন?'),
    options: yesNo },

  { id:'d6_abdominal_op_details', deck:'6', section:'history', type:'textarea',
    label: _D('Abdominal Operation Details', 'पेट के ऑपरेशन का विवरण', 'পেটের অপারেশনের বিবরণ'),
    conditional: { field:'d6_abdominal_op', value:'yes' } },

  { id:'d6_family_history', deck:'6', section:'history', type:'textarea',
    label: _D('Relevant Family History', 'संबंधित पारिवारिक इतिहास', 'প্রাসঙ্গিক পারিবারিক ইতিহাস') },

  { id:'d6_past_illness', deck:'6', section:'history', type:'textarea',
    label: _D('Significant Past Illness', 'महत्वपूर्ण पिछली बीमारी', 'উল্লেখযোগ্য পুরনো অসুস্থতা') },

  { id:'d6_h4_exam', deck:'6', section:'examination', type:'heading',
    label: _D('Clinical Examination — General Survey', 'नैदानिक परीक्षण — सामान्य सर्वेक्षण', 'ক্লিনিকাল পরীক্ষা') },

  { id:'d6_weight', deck:'6', section:'examination', type:'number',
    label: _D('Current Weight (kg)', 'वर्तमान वजन (किग्रा)', 'বর্তমান ওজন (কেজি)') },

  { id:'d6_height', deck:'6', section:'examination', type:'number',
    label: _D('Current Height (cm)', 'वर्तमान ऊंचाई (सेमी)', 'বর্তমান উচ্চতা (সেমি)') },

  { id:'d6_bmi', deck:'6', section:'examination', type:'number',
    label: _D('BMI (kg/m²)', 'बीएमआई (किग्रा/मी²)', 'BMI (কেজি/মি²)') },

  { id:'d6_waist', deck:'6', section:'examination', type:'number',
    label: _D('Waist Circumference (cm)', 'कमर की परिधि (सेमी)', 'কোমরের পরিধি (সেমি)') },

  { id:'d6_hip', deck:'6', section:'examination', type:'number',
    label: _D('Hip Circumference (cm)', 'कूल्हे की परिधि (सेमी)', 'নিতম্বের পরিধি (সেমি)') },

  { id:'d6_pulse', deck:'6', section:'examination', type:'number',
    label: _D('Pulse (beats/min)', 'नाड़ी', 'নাড়ি') },

  { id:'d6_bp', deck:'6', section:'examination', type:'text',
    label: _D('Blood Pressure (mmHg)', 'रक्तचाप (mmHg)', 'রক্তচাপ (mmHg)'),
    placeholder: _D('e.g. 120/80','जैसे 120/80','যেমন ১২০/৮০') },

  { id:'d6_resp_rate', deck:'6', section:'examination', type:'number',
    label: _D('Respiratory Rate (breaths/min)', 'श्वसन दर', 'শ্বাসক্রিয়ার হার') },

  { id:'d6_pallor', deck:'6', section:'examination', type:'radio',
    label: _D('Pallor (sign of anaemia)', 'पीलापन (रक्तहीनता)', 'ফ্যাকাশে ভাব (রক্তশূন্যতা)'),
    options: [{value:'present',label:_D('Present','उपस्थित','আছে')},{value:'absent',label:_D('Absent','अनुपस्थित','নেই')}] },

  { id:'d6_oedema', deck:'6', section:'examination', type:'radio',
    label: _D('Oedema (swelling)', 'सूजन', 'ফোলা'),
    options: [{value:'present',label:_D('Present','उपस्थित','আছে')},{value:'absent',label:_D('Absent','अनुपस्थित','নেই')}] },

  { id:'d6_cyanosis', deck:'6', section:'examination', type:'radio',
    label: _D('Cyanosis', 'नीलिमा', 'সায়ানোসিস'),
    options: [{value:'present',label:_D('Present','उपस्थित','আছে')},{value:'absent',label:_D('Absent','अनुपस्थित','নেই')}] },

  { id:'d6_jaundice', deck:'6', section:'examination', type:'radio',
    label: _D('Jaundice', 'पीलिया', 'জন্ডিস'),
    options: [{value:'present',label:_D('Present','उपस्थित','আছে')},{value:'absent',label:_D('Absent','अनुपस्থित','নেই')}] },

  { id:'d6_clubbing', deck:'6', section:'examination', type:'radio',
    label: _D('Clubbing', 'क्लबिंग', 'ক্লাবিং'),
    options: [{value:'present',label:_D('Present','उपस्थित','আছে')},{value:'absent',label:_D('Absent','अनुपस्थित','নেই')}] },

  { id:'d6_systemic_exam', deck:'6', section:'examination', type:'textarea',
    label: _D('Systemic Examination', 'प्रणालीगत परीक्षण', 'সিস্টেমিক পরীক্ষা') },

  { id:'d6_summary', deck:'6', section:'summary', type:'textarea',
    label: _D('Summary of the Case', 'मामले का सारांश', 'মামলার সারসংক্ষেপ') },

  { id:'d6_management', deck:'6', section:'summary', type:'textarea',
    label: _D('Management of the Case', 'मामले का प्रबंधन', 'মামলার ব্যবস্থাপনা') },

  { id:'d6_h5_antenatal', deck:'6', section:'antenatal_records', type:'heading',
    label: _D('Antenatal Care Records (4 visits)', 'प्रसव-पूर्व देखभाल रिकॉर्ड (4 यात्राएं)', 'প্রসবপূর্ব সেবার রেকর্ড (৪ ভিজিট)') },

  { id:'d6_antenatal_visits', deck:'6', section:'antenatal_records', type:'table',
    label: _D('Antenatal Visit Records', 'प्रसव-पूर्व यात्रा रिकॉर्ड', 'প্রসবপূর্ব ভিজিটের রেকর্ড'),
    addRowLabel: _D('Add Visit','यात्रा जोड़ें','ভিজিট যোগ করুন'),
    columns: [
      { key:'visit_date',     label: _D('Visit Date','यात्रा तिथि','ভিজিটের তারিখ'),       type:'date' },
      { key:'gestation',      label: _D('Gestation (wks)','गर्भकाल (सप्ताह)','গর্ভাবস্থা (সপ্তাহ)'), type:'number' },
      { key:'complaint',      label: _D('Significant Complaint','मुख्य शिकायत','প্রধান অভিযোগ'), type:'text' },
      { key:'weight',         label: _D('Weight (kg)','वजन (किग्रा)','ওজন (কেজি)'),         type:'number' },
      { key:'bp',             label: _D('BP (mmHg)','रक्तचाप','রক্তচাপ'),                   type:'text' },
      { key:'pallor',         label: _D('Pallor','पीलापन','ফ্যাকাশে'), type:'select', options:[{value:'present',label:_D('Yes','हाँ','হ্যাঁ')},{value:'absent',label:_D('No','नहीं','না')}] },
      { key:'oedema',         label: _D('Oedema','सूजन','ফোলা'),       type:'select', options:[{value:'present',label:_D('Yes','हाँ','হ্যাঁ')},{value:'absent',label:_D('No','नहीं','না')}] },
      { key:'fundal_height',  label: _D('Fundal Height (wks)','गर्भाशय की ऊंचाई','জরায়ুর উচ্চতা'), type:'text' },
      { key:'lie',            label: _D('Lie (of fetus)','झुकाव','অবস্থান'),                type:'text' },
      { key:'presentation',   label: _D('Presentation','प्रस्तुति','উপস্থাপনা'),             type:'text' },
      { key:'fhs',            label: _D('Fetal Heart Sound','भ्रूण हृदय ध्वनि','ভ্রূণের হৃদস্পন্দন'), type:'text' },
      { key:'hb',             label: _D('Hb% (g/dL)','हीमोग्लोबिन%','হিমোগ্লোবিন%'),       type:'number' },
      { key:'urine',          label: _D('Urine (sugar/protein)','मूत्र (शर्करा/प्रोटीन)','প্রস্রাব (চিনি/প্রোটিন)'), type:'text' },
      { key:'other_tests',    label: _D('Other Tests (VDRL/USG/etc)','अन्य जाँच','অন্য পরীক্ষা'), type:'text' },
      { key:'ifa',            label: _D('IFA Supplied/Consumed','IFA दी/ली गई','IFA দেওয়া/খাওয়া'), type:'text' },
      { key:'tt',             label: _D('TT/Td Vaccine Given','TT/Td दिया गया','TT/Td দেওয়া হয়েছে'), type:'select', options:yesNo },
      { key:'advice',         label: _D('Advice Given','दी गई सलाह','পরামর্শ'),              type:'text' },
    ]},

  { id:'d6_h6_postnatal', deck:'6', section:'postnatal_records', type:'heading',
    label: _D('Postnatal Medical Records', 'प्रसवोत्तर चिकित्सा रिकॉर्ड', 'প্রসবোত্তর চিকিৎসা রেকর্ড') },

  { id:'d6_postnatal_table', deck:'6', section:'postnatal_records', type:'table',
    label: _D('Postnatal Day-by-Day Records', 'प्रसवोत्तर दिन-दर-दिन रिकॉर्ड', 'প্রসবোত্তর দৈনিক রেকর্ড'),
    addRowLabel: _D('Add Day','दिन जोड़ें','দিন যোগ করুন'),
    columns: [
      { key:'day',          label: _D('Day/Date','दिन/तिथि','দিন/তারিখ'),                 type:'text' },
      { key:'m_complaint',  label: _D('Mother: Complaints','माँ: शिकायतें','মা: অভিযোগ'), type:'text' },
      { key:'m_findings',   label: _D('Mother: Exam Findings (pulse/temp/lochia/fundus/breast)', 'माँ: निष्कर्ष','মা: পরীক্ষার ফলাফল'), type:'text' },
      { key:'m_advice',     label: _D('Mother: Advice','माँ: सलाह','মা: পরামর্শ'),         type:'text' },
      { key:'b_complaint',  label: _D('Baby: Complaints','बच्चा: शिकायतें','শিশু: অভিযোগ'),type:'text' },
      { key:'b_exam',       label: _D('Baby: Exam (cord/eyes/stool/bath)','बच्चा: परीक्षण','শিশু: পরীক্ষা'), type:'text' },
      { key:'b_advice',     label: _D('Baby: Advice','बच्चा: सलाह','শিশু: পরামর্শ'),       type:'text' },
    ]},
];

// ─────────────────────────────────────────
// DECK 7 — INDIVIDUAL HEALTH CHECKUP
// ─────────────────────────────────────────
const DECK7 = [
  { id:'d7_serial_no', deck:'7', section:'id', type:'text',
    label: _D('Serial Number', 'क्रम नंबर', 'ক্রমিক নম্বর') },

  { id:'d7_exam_date', deck:'7', section:'id', type:'date',
    label: _D('Date of Examination', 'परीक्षण की तिथि', 'পরীক্ষার তারিখ') },

  { id:'d7_name', deck:'7', section:'id', type:'text',
    label: _D('Name', 'नाम', 'নাম') },

  { id:'d7_age', deck:'7', section:'id', type:'number',
    label: _D('Age (years)', 'आयु (वर्ष)', 'বয়স (বছর)') },

  { id:'d7_sex', deck:'7', section:'id', type:'radio',
    label: _D('Sex', 'लिंग', 'লিঙ্গ'),
    options: [
      { value:'male',   label: _D('Male','पुरुष','পুরুষ') },
      { value:'female', label: _D('Female','स्त्री','স্ত্রী') },
    ]},

  { id:'d7_occupation', deck:'7', section:'id', type:'text',
    label: _D('Occupation', 'व्यवसाय', 'পেশা') },

  { id:'d7_h1_history', deck:'7', section:'history', type:'heading',
    label: _D('Medical History', 'चिकित्सा इतिहास', 'চিকিৎসা ইতিহাস') },

  { id:'d7_presenting_complaints', deck:'7', section:'history', type:'textarea',
    label: _D('Presenting Complaints (with duration)', 'मुख्य शिकायतें (अवधि सहित)', 'প্রধান অভিযোগ (সময়কাল সহ)') },

  { id:'d7_present_illness', deck:'7', section:'history', type:'textarea',
    label: _D('History of Present Illness', 'वर्तमान बीमारी का इतिहास', 'বর্তমান অসুস্থতার ইতিহাস') },

  { id:'d7_past_illness', deck:'7', section:'history', type:'textarea',
    label: _D('History of Relevant Past Illness / Medical History', 'पिछली संबंधित बीमारी का इतिहास', 'প্রাসঙ্গিক পুরনো অসুস্থতার ইতিহাস') },

  { id:'d7_family_history', deck:'7', section:'history', type:'textarea',
    label: _D('Family History', 'पारिवारिक इतिहास', 'পারিবারিক ইতিহাস') },

  { id:'d7_personal_history', deck:'7', section:'history', type:'textarea',
    label: _D('Personal History (diet, habits, allergies)', 'व्यक्तिगत इतिहास (आहार, आदतें, एलर्जी)', 'ব্যক্তিগত ইতিহাস (খাদ্য, অভ্যাস, অ্যালার্জি)') },

  { id:'d7_h2_exam', deck:'7', section:'examination', type:'heading',
    label: _D('Clinical Examination — General Survey', 'नैदानिक परीक्षण — सामान्य सर्वेक्षण', 'ক্লিনিকাল পরীক্ষা') },

  { id:'d7_pulse', deck:'7', section:'examination', type:'number',
    label: _D('Pulse (beats/min)', 'नाड़ी (धड़कन/मिनट)', 'নাড়ি (বিট/মিনিট)') },

  { id:'d7_bp', deck:'7', section:'examination', type:'text',
    label: _D('Blood Pressure (mmHg)', 'रक्तचाप (mmHg)', 'রক্তচাপ (mmHg)'),
    placeholder: _D('e.g. 120/80','जैसे 120/80','যেমন ১২০/৮০') },

  { id:'d7_pallor', deck:'7', section:'examination', type:'radio',
    label: _D('Pallor', 'पीलापन', 'ফ্যাকাশে ভাব'),
    options: [{value:'present',label:_D('Present','उपस्थित','আছে')},{value:'absent',label:_D('Absent','अनुपस्थित','নেই')}] },

  { id:'d7_jaundice', deck:'7', section:'examination', type:'radio',
    label: _D('Jaundice', 'पीलिया', 'জন্ডিস'),
    options: [{value:'present',label:_D('Present','उपस्थित','আছে')},{value:'absent',label:_D('Absent','अनुपस्थित','নেই')}] },

  { id:'d7_cyanosis', deck:'7', section:'examination', type:'radio',
    label: _D('Cyanosis', 'नीलिमा', 'সায়ানোসিস'),
    options: [{value:'present',label:_D('Present','उपस्थित','আছে')},{value:'absent',label:_D('Absent','अनुपस्थित','নেই')}] },

  { id:'d7_clubbing', deck:'7', section:'examination', type:'radio',
    label: _D('Clubbing', 'क्लबिंग', 'ক্লাবিং'),
    options: [{value:'present',label:_D('Present','उपस्थित','আছে')},{value:'absent',label:_D('Absent','अनुपस्থित','নেই')}] },

  { id:'d7_oedema', deck:'7', section:'examination', type:'radio',
    label: _D('Oedema (swelling)', 'सूजन', 'ফোলা'),
    options: [{value:'present',label:_D('Present','उपस्थित','আছে')},{value:'absent',label:_D('Absent','अनुपस्থित','নেই')}] },

  { id:'d7_weight', deck:'7', section:'examination', type:'number',
    label: _D('Weight (kg)', 'वजन (किग्रा)', 'ওজন (কেজি)') },

  { id:'d7_height', deck:'7', section:'examination', type:'number',
    label: _D('Height (cm)', 'ऊंचाई (सेमी)', 'উচ্চতা (সেমি)') },

  { id:'d7_bmi', deck:'7', section:'examination', type:'number',
    label: _D('BMI (kg/m²)', 'बीएमआई', 'BMI') },

  { id:'d7_systemic_exam', deck:'7', section:'examination', type:'textarea',
    label: _D('Systemic Examination', 'प्रणालीगत परीक्षण', 'সিস্টেমিক পরীক্ষা') },

  { id:'d7_investigations', deck:'7', section:'summary', type:'textarea',
    label: _D('Significant Investigation Findings', 'महत्वपूर्ण जाँच निष्कर्ष', 'উল্লেখযোগ্য পরীক্ষার ফলাফল') },

  { id:'d7_summary', deck:'7', section:'summary', type:'textarea',
    label: _D('Short Summary of the Case', 'मामले का संक्षिप्त सारांश', 'মামলার সংক্ষিপ্ত সারসংক্ষেপ') },

  { id:'d7_management', deck:'7', section:'summary', type:'textarea',
    label: _D('Management of Case', 'मामले का प्रबंधन', 'মামলার ব্যবস্থাপনা') },
];

// ─────────────────────────────────────────
// DECK 7A — ADOLESCENT HEALTH
// ─────────────────────────────────────────
const DECK7A = [
  { id:'d7a_name', deck:'7a', section:'id', type:'text',
    label: _D('Name', 'नाम', 'নাম') },

  { id:'d7a_age', deck:'7a', section:'id', type:'number',
    label: _D('Age (years)', 'आयु (वर्ष)', 'বয়স (বছর)') },

  { id:'d7a_chief_complaints', deck:'7a', section:'history', type:'textarea',
    label: _D('Chief Complaints', 'मुख्य शिकायतें', 'প্রধান অভিযোগ') },

  { id:'d7a_present_illness', deck:'7a', section:'history', type:'textarea',
    label: _D('History of Present Illness', 'वर्तमान बीमारी का इतिहास', 'বর্তমান অসুস্থতার ইতিহাস') },

  { id:'d7a_past_illness', deck:'7a', section:'history', type:'textarea',
    label: _D('History of Relevant Past Illness', 'पिछली संबंधित बीमारी', 'প্রাসঙ্গিক পুরনো অসুস্থতা') },

  { id:'d7a_family_history', deck:'7a', section:'history', type:'textarea',
    label: _D('Relevant Family History', 'संबंधित पारिवारिक इतिहास', 'প্রাসঙ্গিক পারিবারিক ইতিহাস') },

  { id:'d7a_personal_history', deck:'7a', section:'history', type:'textarea',
    label: _D('Personal History (diet, habits, allergies)', 'व्यक्तिगत इतिहास', 'ব্যক্তিগত ইতিহাস') },

  { id:'d7a_h2_exam', deck:'7a', section:'examination', type:'heading',
    label: _D('Clinical Examination', 'नैदानिक परीक्षण', 'ক্লিনিকাল পরীক্ষা') },

  { id:'d7a_general_survey', deck:'7a', section:'examination', type:'textarea',
    label: _D('General Survey (vitals, appearance)', 'सामान्य सर्वेक्षण (जीवन चिह्न, उपस्थिति)', 'সাধারণ সমীক্ষা (গুরুত্বপূর্ণ লক্ষণ, চেহারা)') },

  { id:'d7a_anthropometry', deck:'7a', section:'examination', type:'textarea',
    label: _D('Anthropometric Measurements (height, weight, BMI-for-age per WHO MGRS chart)', 'शारीरिक माप (ऊंचाई, वजन, BMI-for-age WHO MGRS)', 'দেহ পরিমাপ (উচ্চতা, ওজন, BMI-for-age WHO MGRS)') },

  { id:'d7a_systemic_exam', deck:'7a', section:'examination', type:'textarea',
    label: _D('Systemic Examination', 'प्रणालीगत परीक्षण', 'সিস্টেমিক পরীক্ষা') },

  { id:'d7a_h3_heeads', deck:'7a', section:'psychosocial', type:'heading',
    label: _D('Psychosocial History — HEEADS Assessment', 'मनोसामाजिक इतिहास — HEEADS मूल्यांकन', 'মনোসামাজিক ইতিহাস — HEEADS মূল্যায়ন') },

  { id:'d7a_home', deck:'7a', section:'psychosocial', type:'textarea',
    label: _D('H — Home (family situation, relationships)', 'H — घर (पारिवारिक स्थिति, रिश्ते)', 'H — বাড়ি (পারিবারিক পরিস্থিতি, সম্পর্ক)') },

  { id:'d7a_education', deck:'7a', section:'psychosocial', type:'textarea',
    label: _D('E — Education (school performance, attendance)', 'E — शिक्षा (विद्यालय प्रदर्शन, उपस्थिति)', 'E — শিক্ষা (স্কুলের পারফরম্যান্স, উপস্থিতি)') },

  { id:'d7a_eating', deck:'7a', section:'psychosocial', type:'textarea',
    label: _D('E — Eating (diet, body image, eating issues)', 'E — खाना (आहार, शरीर की छवि)', 'E — খাওয়া (খাদ্য, শরীরের ছবি)') },

  { id:'d7a_activities', deck:'7a', section:'psychosocial', type:'textarea',
    label: _D('A — Activities (sports, hobbies, screen time)', 'A — गतिविधियाँ (खेल, शौक, स्क्रीन समय)', 'A — কার্যকলাপ (খেলাধুলা, শখ, স্ক্রিন সময়)') },

  { id:'d7a_drugs', deck:'7a', section:'psychosocial', type:'textarea',
    label: _D('D — Drugs (tobacco, alcohol, substance use)', 'D — नशा (तंबाकू, शराब, मादक पदार्थ)', 'D — মাদক (তামাক, মদ, নেশার দ্রব্য)') },

  { id:'d7a_sexuality', deck:'7a', section:'psychosocial', type:'textarea',
    label: _D('S — Sexuality (sexual activity, relationships, safety — approach sensitively)', 'S — यौनता (संवेदनशीलता से पूछें)', 'S — যৌনতা (সংবেদনশীলভাবে জিজ্ঞাসা করুন)') },

  { id:'d7a_safety', deck:'7a', section:'psychosocial', type:'textarea',
    label: _D('S — Safety (violence, bullying, accidents, suicidal ideation)', 'S — सुरक्षा (हिंसा, बदमाशी, दुर्घटनाएँ)', 'S — নিরাপত্তা (সহিংসতা, ধমক, দুর্ঘটনা)') },

  { id:'d7a_diagnosis', deck:'7a', section:'summary', type:'textarea',
    label: _D('Provisional Diagnosis', 'अनंतिम निदान', 'অস্থায়ী রোগ নির্ণয়') },

  { id:'d7a_management', deck:'7a', section:'summary', type:'textarea',
    label: _D('Management Suggested', 'सुझाया गया प्रबंधन', 'সুপারিশকৃত ব্যবস্থাপনা') },
];

// ─────────────────────────────────────────
// DECK 7B — GERIATRIC HEALTH
// ─────────────────────────────────────────
const DECK7B = [
  { id:'d7b_serial_no', deck:'7b', section:'id', type:'text',
    label: _D('Serial Number of Participant', 'प्रतिभागी का क्रम नंबर', 'অংশগ্রহণকারীর ক্রমিক নম্বর') },

  { id:'d7b_age', deck:'7b', section:'id', type:'number',
    label: _D('Age (years)', 'आयु (वर्ष)', 'বয়স (বছর)') },

  { id:'d7b_sex', deck:'7b', section:'id', type:'radio',
    label: _D('Sex', 'लिंग', 'লিঙ্গ'),
    options: [
      { value:'male',   label: _D('Male','पुरुष','পুরুষ') },
      { value:'female', label: _D('Female','स्त्री','স্ত্রী') },
    ]},

  { id:'d7b_medical_history', deck:'7b', section:'history', type:'textarea',
    label: _D('Medical History (existing conditions, medications)', 'चिकित्सा इतिहास (मौजूदा बीमारियाँ, दवाएँ)', 'চিকিৎসা ইতিহাস (বিদ্যমান রোগ, ওষুধ)') },

  { id:'d7b_general_survey', deck:'7b', section:'examination', type:'textarea',
    label: _D('Clinical Examination — General Survey (vitals, appearance)', 'नैदानिक परीक्षण — सामान्य सर्वेक्षण', 'ক্লিনিকাল পরীক্ষা — সাধারণ সমীক্ষা') },

  { id:'d7b_systemic_exam', deck:'7b', section:'examination', type:'textarea',
    label: _D('Systemic Examination', 'प्रणालीगत परीक्षण', 'সিস্টেমিক পরীক্ষা') },

  { id:'d7b_h2_dentition', deck:'7b', section:'dentition', type:'heading',
    label: _D('Dentition (Teeth)', 'दाँत', 'দাঁত') },

  { id:'d7b_teeth_count', deck:'7b', section:'dentition', type:'number',
    label: _D('Number of Teeth Present', 'दाँतों की संख्या', 'বিদ্যমান দাঁতের সংখ্যা') },

  { id:'d7b_dentures', deck:'7b', section:'dentition', type:'radio',
    label: _D('Removable Dentures / Implants', 'नकली दाँत / इम्प्लांट', 'নকল দাঁত / ইমপ্লান্ট'),
    options: [
      { value:'none',     label: _D('None','कोई नहीं','কোনোটি নয়') },
      { value:'full',     label: _D('Full (complete)','पूर्ण','পূর্ণ') },
      { value:'partial',  label: _D('Partial','आंशिक','আংশিক') },
    ]},

  { id:'d7b_dental_hygiene', deck:'7b', section:'dentition', type:'radio',
    label: _D('Overall Dental Hygiene', 'समग्र दाँत स्वच्छता', 'সামগ্রিক দাঁতের স্বাস্থ্যবিধি'),
    options: [
      { value:'good', label: _D('Good','अच्छी','ভালো') },
      { value:'fair', label: _D('Fair','ठीक','মাঝামাঝি') },
      { value:'poor', label: _D('Poor','खराब','খারাপ') },
    ]},

  { id:'d7b_h3_eyes', deck:'7b', section:'sensory', type:'heading',
    label: _D('Special Sensory Examination — Eyes', 'विशेष संवेदी परीक्षण — आँखें', 'বিশেষ সংবেদী পরীক্ষা — চোখ') },

  { id:'d7b_eye_complaints', deck:'7b', section:'sensory', type:'radio',
    label: _D('Any eye complaints?', 'कोई आँख की शिकायत?', 'চোখের কোনো অভিযোগ?'),
    options: yesNo },

  { id:'d7b_eye_complaint_details', deck:'7b', section:'sensory', type:'textarea',
    label: _D('Eye complaint details', 'आँख की शिकायत का विवरण', 'চোখের অভিযোগের বিবরণ'),
    conditional: { field:'d7b_eye_complaints', value:'yes' } },

  { id:'d7b_eye_doctor', deck:'7b', section:'sensory', type:'radio',
    label: _D('Have you consulted a doctor for eye problem?', 'क्या आँख की समस्या के लिए डॉक्टर से मिले?', 'চোখের সমস্যার জন্য ডাক্তার দেখিয়েছেন?'),
    options: yesNo },

  { id:'d7b_spectacles', deck:'7b', section:'sensory', type:'radio',
    label: _D('Do you use spectacles?', 'क्या आप चश्मा पहनते हैं?', 'চশমা পরেন?'),
    options: yesNo },

  { id:'d7b_spectacles_power_r', deck:'7b', section:'sensory', type:'text',
    label: _D('Spectacle Power — Right Eye', 'चश्मे की शक्ति — दाईं आँख', 'চশমার পাওয়ার — ডান চোখ'),
    conditional: { field:'d7b_spectacles', value:'yes' } },

  { id:'d7b_spectacles_power_l', deck:'7b', section:'sensory', type:'text',
    label: _D('Spectacle Power — Left Eye', 'चश्मे की शक्ति — बाईं आँख', 'চশমার পাওয়ার — বাম চোখ'),
    conditional: { field:'d7b_spectacles', value:'yes' } },

  { id:'d7b_refraction', deck:'7b', section:'sensory', type:'textarea',
    label: _D('Refraction findings', 'अपवर्तन निष्कर्ष', 'রিফ্র্যাকশনের ফলাফল') },

  { id:'d7b_h4_ears', deck:'7b', section:'sensory', type:'heading',
    label: _D('Special Sensory Examination — Ears', 'विशेष संवेदी परीक्षण — कान', 'বিশেষ সংবেদী পরীক্ষা — কান') },

  { id:'d7b_ear_discharge', deck:'7b', section:'sensory', type:'radio',
    label: _D('Any ear discharge?', 'कान से कोई स्राव?', 'কান থেকে কোনো স্রাব?'),
    options: yesNo },

  { id:'d7b_hearing_loss', deck:'7b', section:'sensory', type:'radio',
    label: _D('History of hearing loss?', 'श्रवण हानि का इतिहास?', 'শ্রবণ হারানোর ইতিহাস?'),
    options: yesNo },

  { id:'d7b_hearing_aid', deck:'7b', section:'sensory', type:'radio',
    label: _D('Use of hearing aids?', 'श्रवण यंत्र का उपयोग?', 'শ্রবণ যন্ত্র ব্যবহার?'),
    options: yesNo },

  { id:'d7b_h5_functional', deck:'7b', section:'functional', type:'heading',
    label: _D('Comprehensive Assessment', 'व्यापक मूल्यांकन', 'সামগ্রিক মূল্যায়ন') },

  { id:'d7b_functional_status', deck:'7b', section:'functional', type:'textarea',
    label: _D('Functional Status (ADL — Activities of Daily Living: bathing, dressing, eating, toileting, mobility)', 'कार्यात्मक स्थिति (दैनिक जीवन गतिविधियाँ: नहाना, कपड़े पहनना, खाना, शौच, चलना)', 'কার্যকরী অবস্থা (দৈনন্দিন কার্যকলাপ: স্নান, কাপড় পরা, খাওয়া, শৌচ, হাঁটা)') },

  { id:'d7b_cognition', deck:'7b', section:'functional', type:'textarea',
    label: _D('Cognition Assessment (memory, orientation, calculation — MMSE-like)', 'संज्ञान मूल्यांकन (स्मृति, अभिविन्यास, गणना)', 'জ্ঞান মূল্যায়ন (স্মৃতি, দিক-নির্দেশনা, গণনা)') },

  { id:'d7b_mental_health', deck:'7b', section:'functional', type:'textarea',
    label: _D('Mental Health (depression screening, anxiety, mood)', 'मानसिक स्वास्थ्य (अवसाद, चिंता, मनोदशा)', 'মানসিক স্বাস্থ্য (বিষণ্নতা, উদ্বেগ, মেজাজ)') },

  { id:'d7b_h6_financial', deck:'7b', section:'financial', type:'heading',
    label: _D('Financial Security', 'वित्तीय सुरक्षा', 'আর্থিক নিরাপত্তা') },

  { id:'d7b_financial_status', deck:'7b', section:'financial', type:'radio',
    label: _D('Financial independence level', 'वित्तीय स्वतंत्रता का स्तर', 'আর্থিক স্বনির্ভরতার মাত্রা'),
    options: [
      { value:'independent',  label: _D('Completely Independent','पूरी तरह स्वतंत्र','সম্পূর্ণ স্বনির্ভর') },
      { value:'partial',      label: _D('Partially Dependent','आंशिक रूप से निर्भर','আংশিক নির্ভরশীল') },
      { value:'dependent',    label: _D('Completely Dependent','पूरी तरह निर्भर','সম্পূর্ণ নির্ভরশীল') },
    ]},

  { id:'d7b_family_perception', deck:'7b', section:'financial', type:'radio',
    label: _D('Perception of how family members behave with you', 'परिवार के सदस्यों के व्यवहार की धारणा', 'পরিবারের সদস্যদের আচরণ সম্পর্কে ধারণা'),
    options: [
      { value:'positive', label: _D('Positive','सकारात्मक','ইতিবাচক') },
      { value:'negative', label: _D('Negative','नकारात्मक','নেতিবাচক') },
    ]},

  { id:'d7b_pension', deck:'7b', section:'financial', type:'radio',
    label: _D('Do you receive pension from anywhere?', 'क्या कहीं से पेंशन मिलती है?', 'কোনো জায়গা থেকে পেনশন পান?'),
    options: yesNo },

  { id:'d7b_pension_source', deck:'7b', section:'financial', type:'text',
    label: _D('Pension Source', 'पेंशन का स्रोत', 'পেনশনের উৎস'),
    conditional: { field:'d7b_pension', value:'yes' } },

  { id:'d7b_pension_amount', deck:'7b', section:'financial', type:'number',
    label: _D('Pension Amount (₹/month)', 'पेंशन राशि (₹/माह)', 'পেনশনের পরিমাণ (₹/মাস)'),
    conditional: { field:'d7b_pension', value:'yes' } },

  { id:'d7b_welfare_scheme', deck:'7b', section:'financial', type:'radio',
    label: _D('Any monetary assistance from welfare scheme?', 'किसी कल्याण योजना से आर्थिक सहायता?', 'কোনো কল্যাণমূলক প্রকল্প থেকে আর্থিক সহায়তা?'),
    options: yesNo },

  { id:'d7b_welfare_scheme_name', deck:'7b', section:'financial', type:'text',
    label: _D('Welfare Scheme Name', 'कल्याण योजना का नाम', 'কল্যাণমূলক প্রকল্পের নাম'),
    conditional: { field:'d7b_welfare_scheme', value:'yes' } },

  { id:'d7b_welfare_amount', deck:'7b', section:'financial', type:'number',
    label: _D('Welfare Amount (₹/month)', 'कल्याण राशि (₹/माह)', 'কল্যাণ পরিমাণ (₹/মাস)'),
    conditional: { field:'d7b_welfare_scheme', value:'yes' } },

  { id:'d7b_health_insurance', deck:'7b', section:'financial', type:'radio',
    label: _D('Any health insurance?', 'कोई स्वास्थ्य बीमा?', 'কোনো স্বাস্থ্য বীমা?'),
    options: yesNo },

  { id:'d7b_insurance_source', deck:'7b', section:'financial', type:'text',
    label: _D('Health Insurance Source', 'स्वास्थ्य बीमा का स्रोत', 'স্বাস্থ্য বীমার উৎস'),
    conditional: { field:'d7b_health_insurance', value:'yes' } },

  { id:'d7b_h7_social', deck:'7b', section:'social', type:'heading',
    label: _D('Social Support', 'सामाजिक समर्थन', 'সামাজিক সহায়তা') },

  { id:'d7b_rely_on', deck:'7b', section:'social', type:'radio',
    label: _D('Do you have someone you can rely on for help if needed?', 'क्या जरूरत पर मदद के लिए कोई है?', 'প্রয়োজনে সাহায্যের জন্য কেউ আছে?'),
    options: yesNo },

  { id:'d7b_social_frequency', deck:'7b', section:'social', type:'radio',
    label: _D('How often do you engage in social activities or interact with friends and family?', 'सामाजिक गतिविधियों में या मित्र/परिवार से कितनी बार मिलते हैं?', 'সামাজিক কার্যকলাপে বা বন্ধু/পরিবারের সাথে কতবার যোগাযোগ করেন?'),
    options: [
      { value:'daily',    label: _D('Daily','रोज','প্রতিদিন') },
      { value:'weekly',   label: _D('Weekly','साप्ताहिक','সাপ্তাহিক') },
      { value:'monthly',  label: _D('Monthly','मासिक','মাসিক') },
      { value:'rarely',   label: _D('Rarely','कभी-कभी','কদাচিৎ') },
      { value:'never',    label: _D('Never','कभी नहीं','কখনো না') },
    ]},

  { id:'d7b_plan', deck:'7b', section:'summary', type:'textarea',
    label: _D('Plan of Management', 'प्रबंधन की योजना', 'ব্যবস্থাপনার পরিকল্পনা') },
];

// ─────────────────────────────────────────
// DECK 8 — ACTIONS & RECOMMENDATIONS
// ─────────────────────────────────────────
const DECK8 = [
  { id:'d8_medico_social_diagnosis', deck:'8', section:'actions', type:'textarea',
    label: _D('Medico-Social Diagnosis', 'चिकित्सा-सामाजिक निदान', 'চিকিৎসা-সামাজিক নির্ণয়'),
    placeholder: _D(
      'Summarise the key health and social problems identified across all decks...',
      'सभी decks में पाई गई प्रमुख स्वास्थ्य और सामाजिक समस्याओं का सारांश...',
      'সব ডেকে চিহ্নিত প্রধান স্বাস্থ্য ও সামাজিক সমস্যার সারসংক্ষেপ...'
    )},

  { id:'d8_actions_taken', deck:'8', section:'actions', type:'textarea',
    label: _D('Actions Taken', 'की गई कार्रवाई', 'গৃহীত পদক্ষেপ'),
    placeholder: _D(
      'What actions/interventions were taken during this visit?',
      'इस यात्रा के दौरान क्या कार्रवाई/हस्तक्षेप किए गए?',
      'এই ভিজিটে কী পদক্ষেপ/হস্তক্ষেপ করা হয়েছিল?'
    )},

  { id:'d8_recommendations', deck:'8', section:'actions', type:'textarea',
    label: _D('Recommendations', 'सिफारिशें', 'সুপারিশসমূহ'),
    placeholder: _D(
      'Recommended follow-up, referrals, lifestyle changes, health education...',
      'अनुशंसित फॉलो-अप, रेफरल, जीवनशैली परिवर्तन, स्वास्थ्य शिक्षा...',
      'সুপারিশকৃত ফলো-আপ, রেফারেল, জীবনযাত্রার পরিবর্তন, স্বাস্থ্য শিক্ষা...'
    )},

  { id:'d8_followup_date', deck:'8', section:'actions', type:'date',
    label: _D('Next Follow-up Visit Date', 'अगली फॉलो-अप यात्रा तिथि', 'পরবর্তী ফলো-আপ ভিজিটের তারিখ') },

  { id:'d8_student_signature', deck:'8', section:'actions', type:'text',
    label: _D('Surveyor / Student Name & Signature', 'सर्वेयर/छात्र का नाम और हस्ताक्षर', 'জরিপকারী/শিক্ষার্থীর নাম ও স্বাক্ষর') },
];

// ─────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────
export const SURVEY_DATA_4_8 = [...DECK4, ...DECK5, ...DECK6, ...DECK7, ...DECK7A, ...DECK7B, ...DECK8];
