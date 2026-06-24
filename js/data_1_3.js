/**
 * data.js — ALL survey questions, all 10 decks, trilingual (EN / HI / BN)
 * Structure per question: id, deck, deckTitle, section, sectionTitle, type,
 * label {en,hi,bn}, options, columns, conditional, placeholder, addRowLabel
 */

const _D = (en, hi, bn) => ({ en, hi, bn });

// ─────────────────────────────────────────
// DECK METADATA
// ─────────────────────────────────────────
export const DECK_META = [
  { id: '1',  color: '#60a5fa', icon: '👨‍👩‍👧‍👦', title: _D('Socio-Demographic Profile', 'सामाजिक-जनसांख्यिकीय प्रोफ़ाइल', 'আর্থ-সামাজিক পরিচয়') },
  { id: '2',  color: '#34d399', icon: '🏠', title: _D('Environment & Housing', 'पर्यावरण और आवास', 'পরিবেশ ও বাসস্থান') },
  { id: '3',  color: '#a78bfa', icon: '🧠', title: _D('Knowledge, Attitudes & Practices', 'ज्ञान, दृष्टिकोण और व्यवहार', 'জ্ঞান, মনোভাব ও অনুশীলন') },
  { id: '4',  color: '#fb923c', icon: '🍱', title: _D('Nutrition & Diet Survey', 'पोषण और आहार सर्वे', 'পুষ্টি ও খাদ্য জরিপ') },
  { id: '5',  color: '#f472b6', icon: '👶', title: _D('Under-5 Health Checkup', 'पाँच वर्ष से कम बच्चों का स्वास्थ्य', '৫ বছরের কম শিশুর স্বাস্থ্য') },
  { id: '6',  color: '#38bdf8', icon: '🤰', title: _D('Obstetric History', 'प्रसूति इतिहास', 'প্রসূতি ইতিহাস') },
  { id: '7',  color: '#facc15', icon: '🩺', title: _D('Individual Health Checkup', 'व्यक्तिगत स्वास्थ्य जाँच', 'ব্যক্তিগত স্বাস্থ্য পরীক্ষা') },
  { id: '7a', color: '#a3e635', icon: '🧑', title: _D('Adolescent Health', 'किशोर स्वास्थ्य', 'কিশোর স্বাস্থ্য') },
  { id: '7b', color: '#c084fc', icon: '👴', title: _D('Geriatric Health', 'वृद्ध स्वास्थ्य', 'বৃদ্ধ স্বাস্থ্য') },
  { id: '8',  color: '#fb7185', icon: '📋', title: _D('Actions & Recommendations', 'कार्रवाई और सिफारिशें', 'পদক্ষেপ ও সুপারিশ') },
];

const yesNo = [
  { value: 'yes', label: _D('Yes', 'हाँ', 'হ্যাঁ') },
  { value: 'no',  label: _D('No',  'नहीं', 'না') },
];

// ─────────────────────────────────────────
// DECK 1 — SOCIO-DEMOGRAPHIC
// ─────────────────────────────────────────
const DECK1 = [
  { id:'d1_h1_id', deck:'1', section:'identification', type:'heading',
    label: _D('Family Identification', 'परिवार की पहचान', 'পরিবার চিহ্নিতকরণ') },

  { id:'d1_head_name', deck:'1', section:'identification', type:'text',
    label: _D('Name of Head of Family', 'परिवार के मुखिया का नाम', 'পরিবারের কর্তার নাম'),
    placeholder: _D('Full name', 'पूरा नाम', 'পুরো নাম') },

  { id:'d1_family_type', deck:'1', section:'identification', type:'radio',
    label: _D('Type of Family', 'परिवार का प्रकार', 'পরিবারের ধরন'),
    options: [
      { value:'nuclear', label: _D('Nuclear', 'एकल', 'একক') },
      { value:'joint',   label: _D('Joint',   'संयुक्त', 'যৌথ') },
    ]},

  { id:'d1_address', deck:'1', section:'identification', type:'textarea',
    label: _D('Address', 'पता', 'ঠিকানা'),
    placeholder: _D('Full address', 'पूरा पता', 'পুরো ঠিকানা') },

  { id:'d1_religion', deck:'1', section:'identification', type:'text',
    label: _D('Religion', 'धर्म', 'ধর্ম'),
    placeholder: _D('e.g. Hindu, Muslim, Christian…', 'जैसे हिन्दू, मुस्लिम…', 'যেমন হিন্দু, মুসলিম…') },

  { id:'d1_caste', deck:'1', section:'identification', type:'text',
    label: _D('Caste', 'जाति', 'জাতি') },

  { id:'d1_mother_tongue', deck:'1', section:'identification', type:'text',
    label: _D('Mother Tongue', 'मातृभाषा', 'মাতৃভাষা') },

  { id:'d1_place_of_origin', deck:'1', section:'identification', type:'text',
    label: _D('Place of Origin', 'मूल स्थान', 'আদি নিবাস') },

  { id:'d1_length_of_stay', deck:'1', section:'identification', type:'text',
    label: _D('Length of Stay (years/months)', 'निवास की अवधि (वर्ष/माह)', 'বসবাসের সময়কাল (বছর/মাস)') },

  { id:'d1_h2_members', deck:'1', section:'members', type:'heading',
    label: _D('Family Members', 'परिवार के सदस्य', 'পরিবারের সদস্যরা') },

  { id:'d1_members_table', deck:'1', section:'members', type:'table',
    label: _D('Particulars of Family Members', 'परिवार के सदस्यों का विवरण', 'পরিবারের সদস্যদের বিবরণ'),
    addRowLabel: _D('Add Member', 'सदस्य जोड़ें', 'সদস্য যোগ করুন'),
    columns: [
      { key:'name',            label: _D('Name','नाम','নাম'),              type:'text' },
      { key:'relation',        label: _D('Relation to HOF','मुखिया से संबंध','কর্তার সাথে সম্পর্ক'), type:'text' },
      { key:'age',             label: _D('Age','आयु','বয়স'),              type:'number' },
      { key:'sex',             label: _D('Sex','लिंग','লিঙ্গ'),             type:'select',
        options:[{value:'m',label:_D('M','पु.','পু.')},{value:'f',label:_D('F','स्त्री','স্ত্রী')},{value:'other',label:_D('Other','अन्य','অন্য')}] },
      { key:'marital_status',  label: _D('Marital Status','वैवाहिक स्थिति','বৈবাহিক অবস্থা'), type:'select',
        options:[{value:'single',label:_D('Single','अविवाहित','অবিবাহিত')},{value:'married',label:_D('Married','विवाहित','বিবাহিত')},{value:'widowed',label:_D('Widowed','विधवा/विधुर','বিধবা/বিপত্নীক')},{value:'divorced',label:_D('Divorced','तलाकशुदा','বিবাহবিচ্ছিন্ন')}] },
      { key:'education',       label: _D('Education Level','शिक्षा स्तर','শিক্ষার স্তর'), type:'select',
        options:[{value:'illiterate',label:_D('Illiterate','निरक्षर','নিরক্ষর')},{value:'primary',label:_D('Primary','प्राथमिक','প্রাথমিক')},{value:'middle',label:_D('Middle','माध्यमिक','মাধ্যমিক')},{value:'secondary',label:_D('Secondary (10th)','हाई स्कूल','উচ্চ মাধ্যমিক')},{value:'higher_sec',label:_D('Higher Secondary (12th)','इंटर','উচ্চতর মাধ্যমিক')},{value:'graduate',label:_D('Graduate','स्नातक','স্নাতক')},{value:'post_grad',label:_D('Post Graduate','परास्नातक','স্নাতকোত্তর')}] },
      { key:'occupation',      label: _D('Occupation','व्यवसाय','পেশা'),   type:'text' },
      { key:'physical_activity',label:_D('Physical Activity','शारीरिक गतिविधि','শারীরিক কার্যকলাপ'), type:'select',
        options:[{value:'sedentary',label:_D('Sedentary','निष्क्रिय','নিষ্ক্রিয়')},{value:'moderate',label:_D('Moderate','मध्यम','মাঝারি')},{value:'heavy',label:_D('Heavy','भारी','ভারী')}] },
      { key:'physio_status',   label: _D('Physiological Status','शारीरिक अवस्था','দৈহিক অবস্থা'), type:'select',
        options:[{value:'normal',label:_D('Normal','सामान्य','স্বাভাবিক')},{value:'pregnant',label:_D('Pregnant','गर्भवती','গর্ভবতী')},{value:'lactating',label:_D('Lactating','स्तनपान कराने वाली','স্তন্যদায়ী')},{value:'child',label:_D('Child (<5yrs)','बच्चा','শিশু')}] },
    ]},

  { id:'d1_h3_pets', deck:'1', section:'pets', type:'heading',
    label: _D('Pets & Animals', 'पालतू/जानवर', 'পোষা প্রাণী/পশু') },

  { id:'d1_has_pets', deck:'1', section:'pets', type:'radio',
    label: _D('Are there any pets/animals in the house or surroundings?', 'क्या घर या आसपास कोई पालतू/जानवर है?', 'বাড়িতে বা আশেপাশে কোনো পোষা প্রাণী বা পশু আছে?'),
    options: yesNo },

  { id:'d1_pets_table', deck:'1', section:'pets', type:'table',
    label: _D('Details of Pets/Animals', 'पालतू/जानवरों का विवरण', 'পোষা প্রাণীর বিবরণ'),
    conditional: { field:'d1_has_pets', value:'yes' },
    addRowLabel: _D('Add Animal', 'जानवर जोड़ें', 'প্রাণী যোগ করুন'),
    columns: [
      { key:'type',       label: _D('Type','प्रकार','ধরন'),                type:'text' },
      { key:'domestic',   label: _D('Domestic?','घरेलू?','গৃহপালিত?'),   type:'select', options:yesNo },
      { key:'vaccinated', label: _D('Vaccinated?','टीकाकृत?','টিকাপ্রাপ্ত?'), type:'select', options:yesNo },
      { key:'location',   label: _D('Location in house','घर में स्थान','বাড়িতে অবস্থান'), type:'text' },
      { key:'handler',    label: _D('Person handling','संभालने वाला','যে দেখাশোনা করে'), type:'text' },
      { key:'hygiene',    label: _D('Handler washes hands?','हाथ धोता है?','হাত ধোয়?'),  type:'select', options:yesNo },
    ]},

  { id:'d1_h4_income', deck:'1', section:'income', type:'heading',
    label: _D('Income & Expenditure', 'आय और व्यय', 'আয় ও ব্যয়') },

  { id:'d1_total_income', deck:'1', section:'income', type:'number',
    label: _D('Total Monthly Income of Family (₹)', 'परिवार की कुल मासिक आय (₹)', 'পরিবারের মোট মাসিক আয় (₹)') },

  { id:'d1_total_expenditure', deck:'1', section:'income', type:'number',
    label: _D('Total Monthly Expenditure (₹)', 'कुल मासिक व्यय (₹)', 'মোট মাসিক ব্যয় (₹)') },

  { id:'d1_balance', deck:'1', section:'income', type:'number',
    label: _D('Balance (Income - Expenditure) (₹)', 'शेष (आय - व्यय) (₹)', 'অবশিষ্ট (আয় - ব্যয়) (₹)') },

  { id:'d1_earning_members', deck:'1', section:'income', type:'number',
    label: _D('Total Earning Members', 'कुल कमाने वाले सदस्य', 'মোট উপার্জনকারী সদস্য সংখ্যা') },

  { id:'d1_dependents', deck:'1', section:'income', type:'number',
    label: _D('Total Dependents', 'कुल आश्रित', 'মোট নির্ভরশীল সদস্য') },

  { id:'d1_per_capita_income', deck:'1', section:'income', type:'number',
    label: _D('Per Capita Income (₹/month)', 'प्रति व्यक्ति आय (₹/माह)', 'মাথাপিছু আয় (₹/মাস)') },

  { id:'d1_expenditure_table', deck:'1', section:'income', type:'table',
    label: _D('Monthly Expenditure Breakdown', 'मासिक व्यय का विवरण', 'মাসিক ব্যয়ের বিভাজন'),
    addRowLabel: _D('Add Item', 'मद जोड़ें', 'মদ যোগ করুন'),
    columns: [
      { key:'item',       label: _D('Item','मद','বিষয়'),                    type:'text' },
      { key:'amount',     label: _D('Amount (₹)','राशि (₹)','পরিমাণ (₹)'), type:'number' },
      { key:'percentage', label: _D('Percentage (%)','प्रतिशत (%)','শতাংশ (%)'), type:'number' },
    ]},

  { id:'d1_savings', deck:'1', section:'income', type:'textarea',
    label: _D('Savings Methods', 'बचत के तरीके', 'সঞ্চয়ের পদ্ধতি') },

  { id:'d1_health_insurance', deck:'1', section:'income', type:'radio',
    label: _D('Availing any Health Insurance / Social Security Scheme?', 'किसी स्वास्थ्य बीमा/सामाजिक सुरक्षा योजना का लाभ उठा रहे हैं?', 'কোনো স্বাস্থ্য বীমা বা সামাজিক সুরক্ষা প্রকল্পের সুবিধা পাচ্ছেন?'),
    options: yesNo },

  { id:'d1_insurance_details', deck:'1', section:'income', type:'textarea',
    label: _D('Insurance / Scheme Details', 'बीमा/योजना का विवरण', 'বীমা/প্রকল্পের বিবরণ'),
    conditional: { field:'d1_health_insurance', value:'yes' } },

  { id:'d1_in_debt', deck:'1', section:'income', type:'radio',
    label: _D('Is the family in debt?', 'क्या परिवार कर्ज में है?', 'পরিবার কি ঋণগ্রস্ত?'),
    options: yesNo },

  { id:'d1_debt_details', deck:'1', section:'income', type:'textarea',
    label: _D('Debt Details (reason, source, repayment)', 'ऋण विवरण (कारण, स्रोत, भुगतान)', 'ঋণের বিবরণ (কারণ, উৎস, পরিশোধ পদ্ধতি)'),
    conditional: { field:'d1_in_debt', value:'yes' } },

  { id:'d1_kuppuswamy', deck:'1', section:'income', type:'textarea',
    label: _D('Modified Kuppuswamy Scale — Socioeconomic Assessment (Score & Class)', 'संशोधित कुप्पूस्वामी पैमाने से सामाजिक-आर्थिक आकलन', 'পরিবর্তিত কুপ্পুস্বামী স্কেল অনুযায়ী আর্থ-সামাজিক মূল্যায়ন') },

  { id:'d1_h5_social', deck:'1', section:'social', type:'heading',
    label: _D('Social Problems Assessment', 'सामाजिक समस्याओं का आकलन', 'সামাজিক সমস্যা মূল্যায়ন') },

  { id:'d1_unemployed_member', deck:'1', section:'social', type:'radio',
    label: _D('Any unemployed member in the family?', 'परिवार में कोई बेरोजगार सदस्य?', 'পরিবারে কোনো বেকার সদস্য আছে?'),
    options: yesNo },

  { id:'d1_substance_use', deck:'1', section:'social', type:'radio',
    label: _D('Substance use (alcohol/drug/smoking/tobacco) in family?', 'परिवार में नशे का उपयोग (शराब/ड्रग/धूम्रपान/तंबाकू)?', 'পরিবারে মাদকের ব্যবহার (মদ/নেশা/ধূমপান/তামাক)?'),
    options: yesNo },

  { id:'d1_substance_details', deck:'1', section:'social', type:'textarea',
    label: _D('Substance Use Details (type, who uses, amount, frequency, duration, cost)', 'नशे का विवरण (प्रकार, उपयोगकर्ता, मात्रा, आवृत्ति, अवधि, लागत)', 'মাদকের বিবরণ (ধরন, ব্যবহারকারী, পরিমাণ, কতবার, সময়কাল, খরচ)'),
    conditional: { field:'d1_substance_use', value:'yes' } },

  { id:'d1_unmarried_girl', deck:'1', section:'social', type:'radio',
    label: _D('Any unmarried girl in the family?', 'परिवार में कोई अविवाहित लड़की?', 'পরিবারে কোনো অবিবাহিত মেয়ে আছে?'),
    options: yesNo },

  { id:'d1_unmarried_girl_time', deck:'1', section:'social', type:'textarea',
    label: _D('How does she spend her time?', 'वह अपना समय कैसे बिताती है?', 'সে কীভাবে সময় কাটায়?'),
    conditional: { field:'d1_unmarried_girl', value:'yes' } },

  { id:'d1_bad_relationship', deck:'1', section:'social', type:'radio',
    label: _D('Bad interpersonal relationship in family?', 'परिवार में खराब आपसी संबंध?', 'পরিবারে খারাপ সম্পর্ক আছে?'),
    options: yesNo },

  { id:'d1_bad_relationship_who', deck:'1', section:'social', type:'textarea',
    label: _D('Between whom?', 'किनके बीच?', 'কাদের মধ্যে?'),
    conditional: { field:'d1_bad_relationship', value:'yes' } },

  { id:'d1_single_mother', deck:'1', section:'social', type:'radio',
    label: _D('Any unmarried, divorced or abandoned mother in the family?', 'परिवार में कोई अविवाहित, तलाकशुदा या परित्यक्त माँ?', 'পরিবারে অবিবাহিত, বিবাহবিচ্ছিন্ন বা পরিত্যক্তা মা আছে?'),
    options: yesNo },

  { id:'d1_handicapped_member', deck:'1', section:'social', type:'radio',
    label: _D('Any handicapped or chronically ill family member?', 'परिवार में कोई विकलांग या दीर्घकालीन रूप से बीमार सदस्य?', 'পরিবারে কোনো প্রতিবন্ধী বা দীর্ঘমেয়াদি অসুস্থ সদস্য?'),
    options: yesNo },

  { id:'d1_child_not_school', deck:'1', section:'social', type:'radio',
    label: _D('Any child above 5 years not going to school?', '५ वर्ष से ऊपर कोई बच्चा विद्यालय नहीं जाता?', '৫ বছরের বেশি কোনো শিশু স্কুলে যায় না?'),
    options: yesNo },

  { id:'d1_child_not_school_reasons', deck:'1', section:'social', type:'textarea',
    label: _D('Reasons / Duration / Efforts to enroll', 'कारण / अवधि / प्रयास', 'কারণ / সময়কাল / ভর্তির চেষ্টা'),
    conditional: { field:'d1_child_not_school', value:'yes' } },

  { id:'d1_women_icds', deck:'1', section:'social', type:'radio',
    label: _D('Any woman (15-49 yrs) not availing ICDS services?', 'कोई महिला (15-49 वर्ष) ICDS सेवाओं का लाभ नहीं ले रही?', 'কোনো মহিলা (১৫-৪৯ বছর) ICDS সেবা পাচ্ছেন না?'),
    options: yesNo },

  { id:'d1_women_icds_reasons', deck:'1', section:'social', type:'textarea',
    label: _D('Reasons', 'कारण', 'কারণ'),
    conditional: { field:'d1_women_icds', value:'yes' } },

  { id:'d1_child_icds', deck:'1', section:'social', type:'radio',
    label: _D('Any child (0-6 yrs) not availing ICDS services?', 'कोई बच्चा (0-6 वर्ष) ICDS सेवाओं का लाभ नहीं ले रहा?', 'কোনো শিশু (০-৬ বছর) ICDS সেবা পাচ্ছে না?'),
    options: yesNo },

  { id:'d1_child_icds_reasons', deck:'1', section:'social', type:'textarea',
    label: _D('Reasons', 'कारण', 'কারণ'),
    conditional: { field:'d1_child_icds', value:'yes' } },

  { id:'d1_mother_working', deck:'1', section:'social', type:'radio',
    label: _D('Is the mother working? If so, who looks after children?', 'क्या माँ काम करती है? अगर हाँ, बच्चों की देखभाल कौन करता है?', 'মা কি কাজ করেন? তাহলে শিশুদের দেখাশোনা কে করে?'),
    options: yesNo },

  { id:'d1_mother_working_child_care', deck:'1', section:'social', type:'textarea',
    label: _D('Who looks after children during mother\'s absence?', 'माँ की अनुपस्थिति में बच्चों की देखभाल कौन?', 'মায়ের অনুপস্থিতিতে শিশুদের দেখাশোনা কে করে?'),
    conditional: { field:'d1_mother_working', value:'yes' } },

  { id:'d1_child_labour', deck:'1', section:'social', type:'radio',
    label: _D('Child labour (child <14 yrs working to earn money)?', 'बाल श्रम (14 वर्ष से कम बच्चा पैसे के लिए काम कर रहा है)?', 'শিশুশ্রম (১৪ বছরের কম বয়সী শিশু অর্থ উপার্জনের জন্য কাজ করছে)?'),
    options: yesNo },

  { id:'d1_physical_abuse', deck:'1', section:'social', type:'radio',
    label: _D('History of physical abuse to any family member?', 'किसी परिवार के सदस्य के साथ शारीरिक दुर्व्यवहार का इतिहास?', 'পরিবারের কোনো সদস্যকে শারীরিক নির্যাতনের ইতিহাস?'),
    options: yesNo },

  { id:'d1_physical_abuse_details', deck:'1', section:'social', type:'textarea',
    label: _D('Details of abuse', 'दुर्व्यवहार का विवरण', 'নির্যাতনের বিবরণ'),
    conditional: { field:'d1_physical_abuse', value:'yes' } },

  { id:'d1_h6_media', deck:'1', section:'media', type:'heading',
    label: _D('Media & Possessions', 'मीडिया और संपत्ति', 'মিডিয়া ও সম্পদ') },

  { id:'d1_info_sources', deck:'1', section:'media', type:'multiselect',
    label: _D('How does the family get information/news?', 'परिवार को जानकारी/समाचार कैसे मिलता है?', 'পরিবার কীভাবে তথ্য/খবর পায়?'),
    options: [
      { value:'newspaper', label: _D('Newspaper','अखबार','সংবাদপত্র') },
      { value:'radio',     label: _D('Radio','रेडियो','রেডিও') },
      { value:'television',label: _D('Television','टेलीविजन','টেলিভিশন') },
      { value:'telephone', label: _D('Telephone','टेलीफोन','টেলিফোন') },
      { value:'mobile',    label: _D('Mobile','मोबाइल','মোবাইল') },
      { value:'computer',  label: _D('Computer/Internet','कंप्यूटर/इंटरनेट','কম্পিউটার/ইন্টারনেট') },
    ]},

  { id:'d1_possessions', deck:'1', section:'media', type:'multiselect',
    label: _D('Household Possessions', 'घरेलू संपत्ति', 'ঘরের সম্পদ'),
    options: [
      { value:'bicycle',      label: _D('Bicycle','साइकिल','সাইকেল') },
      { value:'electricity',  label: _D('Electricity connection','बिजली कनेक्शन','বিদ্যুৎ সংযোগ') },
      { value:'fan',          label: _D('Fan','पंखा','পাখা') },
      { value:'radio',        label: _D('Radio','रेडियो','রেডিও') },
      { value:'tv',           label: _D('Television','टीवी','টেলিভিশন') },
      { value:'media_player', label: _D('Media Player','मीडिया प्लेयर','মিডিয়া প্লেয়ার') },
      { value:'telephone',    label: _D('Telephone','टेलीफोन','টেলিফোন') },
      { value:'mobile',       label: _D('Mobile Phone','मोबाइल','মোবাইল ফোন') },
      { value:'computer',     label: _D('Computer','कंप्यूटर','কম্পিউটার') },
      { value:'refrigerator', label: _D('Refrigerator','फ्रिज','রেফ্রিজারেটর') },
      { value:'gas_oven',     label: _D('Gas Oven / Stove','गैस चूल्हा','গ্যাস চুলা') },
    ]},

  { id:'d1_free_time', deck:'1', section:'media', type:'textarea',
    label: _D('How do they pass their free time?', 'वे अपना खाली समय कैसे बिताते हैं?', 'তারা অবসর সময় কীভাবে কাটায়?') },

  { id:'d1_other_info', deck:'1', section:'media', type:'textarea',
    label: _D('Other relevant information', 'अन्य प्रासंगिक जानकारी', 'অন্যান্য প্রাসঙ্গিক তথ্য') },

  { id:'d1_salient_findings', deck:'1', section:'summary', type:'textarea',
    label: _D('Salient Findings / Problems Identified (bullet points)', 'प्रमुख निष्कर्ष / समस्याएँ (बिंदुओं में)', 'প্রধান তথ্য / চিহ্নিত সমস্যা (বুলেট পয়েন্টে)') },
];

// ─────────────────────────────────────────
// DECK 2 — ENVIRONMENT & HOUSING
// ─────────────────────────────────────────
const DECK2 = [
  { id:'d2_h1', deck:'2', section:'housing', type:'heading',
    label: _D('Housing Assessment', 'आवास का आकलन', 'বাসস্থান মূল্যায়ন') },

  { id:'d2_locality', deck:'2', section:'housing', type:'textarea',
    label: _D('Locality with relevant health hazards / opportunities', 'स्वास्थ्य जोखिम/अवसरों सहित क्षेत्र का विवरण', 'স্বাস্থ্য ঝুঁকি/সুবিধা সহ এলাকার বিবরণ') },

  { id:'d2_site_elevation', deck:'2', section:'housing', type:'radio',
    label: _D('Site (land level)', 'स्थल (भूमि स्तर)', 'স্থান (জমির স্তর)'),
    options: [
      { value:'elevated',     label: _D('Elevated','ऊँचा','উঁচু') },
      { value:'not_elevated', label: _D('Not Elevated','नीचा','নিচু') },
    ]},

  { id:'d2_setback', deck:'2', section:'housing', type:'textarea',
    label: _D('Set Back Area (description)', 'सेट बैक एरिया', 'সেট ব্যাক এলাকা') },

  { id:'d2_approach_road', deck:'2', section:'housing', type:'radio',
    label: _D('Approach Road', 'आने का रास्ता', 'পৌঁছানোর রাস্তা'),
    options: [
      { value:'narrow',     label: _D('Narrow','संकरा','সরু') },
      { value:'not_narrow', label: _D('Not Narrow (wide)','चौड़ा','চওড়া') },
    ]},

  { id:'d2_house_type', deck:'2', section:'housing', type:'radio',
    label: _D('Type of House', 'मकान का प्रकार', 'বাড়ির ধরন'),
    options: [
      { value:'pucca', label: _D('Pucca (Concrete)','पक्का','পাকা') },
      { value:'kutcha',label: _D('Kutcha (Mud/Thatch)','कच्चा','কাঁচা') },
      { value:'mixed', label: _D('Mixed','मिश्रित','মিশ্র') },
    ]},

  { id:'d2_ownership', deck:'2', section:'housing', type:'radio',
    label: _D('Ownership', 'मकान स्वामित्व', 'বাড়ির মালিকানা'),
    options: [
      { value:'own',    label: _D('Own','अपना','নিজের') },
      { value:'rented', label: _D('Rented','किराए का','ভাড়া') },
      { value:'free',   label: _D('Free (provided)','मुफ्त','বিনামূল্যে') },
    ]},

  { id:'d2_h2_overcrowding', deck:'2', section:'housing', type:'heading',
    label: _D('Overcrowding Assessment', 'भीड़भाड़ का आकलन', 'অতিরিক্ত ভিড়ের মূল্যায়ন') },

  { id:'d2_living_rooms', deck:'2', section:'housing', type:'number',
    label: _D('Number of Living Rooms', 'रहने के कमरों की संख्या', 'বসবাসের ঘরের সংখ্যা') },

  { id:'d2_floor_space', deck:'2', section:'housing', type:'number',
    label: _D('Total Floor Space of Living Rooms (sq ft)', 'कुल फर्श क्षेत्र (वर्ग फुट)', 'মোট মেঝে এলাকা (বর্গফুট)') },

  { id:'d2_per_unit_space', deck:'2', section:'housing', type:'number',
    label: _D('Per Unit Floor Space (sq ft/person)', 'प्रति व्यक्ति फर्श क्षेत्र (वर्ग फुट)', 'মাথাপিছু মেঝে এলাকা (বর্গফুট)') },

  { id:'d2_persons_per_room', deck:'2', section:'housing', type:'number',
    label: _D('Persons Per Room', 'प्रति कमरे व्यक्ति', 'প্রতি ঘরে ব্যক্তি') },

  { id:'d2_sex_separation', deck:'2', section:'housing', type:'radio',
    label: _D('Sex Separation (separate sleeping area for men/women)', 'लिंग विभाजन (पुरुष/महिला के लिए अलग कमरा)', 'লিঙ্গভিত্তিক পৃথক ঘুমানোর জায়গা আছে?'),
    options: yesNo },

  { id:'d2_overcrowding_comment', deck:'2', section:'housing', type:'textarea',
    label: _D('Comment on Overcrowding', 'भीड़ पर टिप्पणी', 'অতিরিক্ত ভিড় সম্পর্কে মন্তব্য') },

  { id:'d2_h3_ventilation', deck:'2', section:'housing', type:'heading',
    label: _D('Ventilation & Lighting', 'वेंटिलेशन और रोशनी', 'বায়ুচলাচল ও আলো') },

  { id:'d2_ventilation', deck:'2', section:'housing', type:'textarea',
    label: _D('Assessment of Ventilation (windows, cross-ventilation)', 'वेंटिलेशन का आकलन (खिड़कियाँ, क्रॉस-वेंटिलेशन)', 'বায়ুচলাচলের মূল্যায়ন (জানালা, ক্রস-ভেন্টিলেশন)') },

  { id:'d2_lighting', deck:'2', section:'housing', type:'radio',
    label: _D('Lighting', 'रोशनी', 'আলো'),
    options: [
      { value:'adequate',   label: _D('Adequate','पर्याप्त','পর্যাপ্ত') },
      { value:'inadequate', label: _D('Inadequate','अपर्याप्त','অপর্যাপ্ত') },
    ]},

  { id:'d2_dampness', deck:'2', section:'housing', type:'radio',
    label: _D('Dampness in walls/floor', 'दीवारों/फर्श में नमी', 'দেয়াল/মেঝেতে স্যাঁতসেঁতে ভাব'),
    options: [
      { value:'present',           label: _D('Present','उपस्थित','আছে') },
      { value:'absent',            label: _D('Absent','अनुपस्थित','নেই') },
      { value:'cannot_determine',  label: _D('Cannot determine','निर्धारित नहीं','নির্ধারণ করা যাচ্ছে না') },
    ]},

  { id:'d2_moulds', deck:'2', section:'housing', type:'radio',
    label: _D('Visible Moulds on Walls', 'दीवारों पर फफूंद/सीलन', 'দেয়ালে ছত্রাক দৃশ্যমান?'),
    options: [
      { value:'present', label: _D('Present','उपस्थित','আছে') },
      { value:'absent',  label: _D('Absent','अनुपस्थित','নেই') },
    ]},

  { id:'d2_h4_kitchen', deck:'2', section:'kitchen', type:'heading',
    label: _D('Kitchen', 'रसोई', 'রান্নাঘর') },

  { id:'d2_kitchen_location', deck:'2', section:'kitchen', type:'radio',
    label: _D('Kitchen Location', 'रसोई की स्थिति', 'রান্নাঘরের অবস্থান'),
    options: [
      { value:'separate_room', label: _D('Separate Room','अलग कमरे में','আলাদা ঘরে') },
      { value:'living_room',   label: _D('In Living Room','रहने के कमरे में','বসার ঘরে') },
      { value:'verandah',      label: _D('On Verandah','बरामदे में','বারান্দায়') },
    ]},

  { id:'d2_fuel_type', deck:'2', section:'kitchen', type:'multiselect',
    label: _D('Type of Fuel Used', 'उपयोग किया जाने वाला ईंधन', 'ব্যবহৃত জ্বালানির ধরন'),
    options: [
      { value:'coal',      label: _D('Coal','कोयला','কয়লা') },
      { value:'wood',      label: _D('Wood','लकड़ी','কাঠ') },
      { value:'lpg',       label: _D('LPG','एलपीजी','এলপিজি') },
      { value:'kerosene',  label: _D('Kerosene','मिट्टी का तेल','কেরোসিন') },
      { value:'electric',  label: _D('Electric Heater','बिजली चूल्हा','বৈদ্যুতিক চুলা') },
    ]},

  { id:'d2_smoke_nuisance', deck:'2', section:'kitchen', type:'radio',
    label: _D('Smoke Nuisance', 'धुएँ की समस्या', 'ধোঁয়ার সমস্যা'),
    options: [
      { value:'present', label: _D('Present','उपस्थित','আছে') },
      { value:'absent',  label: _D('Absent','अनुपस्थित','নেই') },
    ]},

  { id:'d2_stove_type', deck:'2', section:'kitchen', type:'radio',
    label: _D('Stove / Cooking Setup Type', 'चूल्हे का प्रकार', 'চুলার ধরন'),
    options: [
      { value:'open_fire',          label: _D('Open Fire','खुली आग','খোলা আগুন') },
      { value:'stove_no_chimney',   label: _D('Stove without chimney','बिना चिमनी का चूल्हा','চিমনি ছাড়া চুলা') },
      { value:'stove_with_chimney', label: _D('Stove with chimney/hood','चिमनी/हुड वाला चूल्हा','চিমনি/হুড সহ চুলা') },
      { value:'closed_chimney',     label: _D('Closed stove with chimney','बंद चिमनी चूल्हा','বদ্ধ চিমনিযুক্ত চুলা') },
    ]},

  { id:'d2_cooking_smoke_outlet', deck:'2', section:'kitchen', type:'radio',
    label: _D('Is there a smoke outlet if cooking in living room?', 'रहने के कमरे में खाना पकाने पर धुआँ निकासी है?', 'বসার ঘরে রান্না করলে ধোঁয়া বের হওয়ার রাস্তা আছে?'),
    conditional: { field:'d2_kitchen_location', value:'living_room' },
    options: yesNo },

  { id:'d2_food_storage_raw', deck:'2', section:'kitchen', type:'textarea',
    label: _D('Storage of Raw Food', 'कच्चे खाने का भंडारण', 'কাঁচা খাবার সংরক্ষণ') },

  { id:'d2_food_storage_cooked', deck:'2', section:'kitchen', type:'textarea',
    label: _D('Storage of Cooked Food', 'पके खाने का भंडारण', 'রান্না করা খাবার সংরক্ষণ') },

  { id:'d2_h5_drainage', deck:'2', section:'drainage', type:'heading',
    label: _D('Drainage & Pests', 'नाली और कीट', 'নর্দমা ও পোকামাকড়') },

  { id:'d2_drainage_around', deck:'2', section:'drainage', type:'textarea',
    label: _D('Comment on Drainage System Around House', 'घर के चारों ओर नाली व्यवस्था पर टिप्पणी', 'বাড়ির চারপাশে নর্দমা ব্যবস্থা সম্পর্কে মন্তব্য') },

  { id:'d2_wastewater', deck:'2', section:'drainage', type:'textarea',
    label: _D('Comment on Household Wastewater Drainage', 'घरेलू गंदे पानी की निकासी', 'পারিবারিক বর্জ্যজল নিষ্কাশন') },

  { id:'d2_mosquito_breeding', deck:'2', section:'drainage', type:'textarea',
    label: _D('Comment on Mosquito Breeding Places', 'मच्छर पनपने की जगहें', 'মশার প্রজনন স্থান') },

  { id:'d2_fly_nuisance', deck:'2', section:'drainage', type:'radio',
    label: _D('Fly Nuisance', 'मक्खियों की समस्या', 'মাছির উপদ্রব'),
    options: [
      { value:'present', label: _D('Present','उपस्थित','আছে') },
      { value:'absent',  label: _D('Absent','अनुপস্থিত','নেই') },
    ]},

  { id:'d2_rodent_nuisance', deck:'2', section:'drainage', type:'radio',
    label: _D('Rodent Nuisance', 'चूहों/कीड़ों की समस्या', 'ইঁদুর/কীটের উপদ্রব'),
    options: [
      { value:'present', label: _D('Present','उपस्थित','আছে') },
      { value:'absent',  label: _D('Absent','অনুপস্থিত','নেই') },
    ]},

  { id:'d2_h6_water', deck:'2', section:'water', type:'heading',
    label: _D('Water Supply', 'जल आपूर्ति', 'জল সরবরাহ') },

  { id:'d2_water_source_drinking', deck:'2', section:'water', type:'radio',
    label: _D('Source of Drinking Water', 'पीने के पानी का स्रोत', 'পানীয় জলের উৎস'),
    options: [
      { value:'tubewell_own',    label: _D('Tubewell (own)','नलकूप (अपना)','নলকূপ (নিজস্ব)') },
      { value:'tubewell_shared', label: _D('Tubewell (shared)','नलकूप (साझा)','নলকূপ (ভাগাভাগি)') },
      { value:'tap_domestic',    label: _D('Tap (domestic)','नल (घरेलू)','কল (পারিবারিক)') },
      { value:'tap_public',      label: _D('Tap (public)','नल (सार्वजनिक)','কল (সার্বজনীন)') },
      { value:'river',           label: _D('River/Pond','नदी/तालाब','নদী/পুকুর') },
      { value:'other',           label: _D('Other','अन्य','অন্য') },
    ]},

  { id:'d2_water_source_cooking', deck:'2', section:'water', type:'radio',
    label: _D('Source of Cooking Water', 'खाना पकाने के पानी का स्रोत', 'রান্নার জলের উৎস'),
    options: [
      { value:'same',            label: _D('Same as drinking','पीने जैसा','পানীয় জলের মতো') },
      { value:'tubewell_own',    label: _D('Tubewell (own)','नलकूप (अपना)','নলকূপ (নিজস্ব)') },
      { value:'tubewell_shared', label: _D('Tubewell (shared)','नलकूप (साझा)','নলকূপ (ভাগাভাগি)') },
      { value:'tap_domestic',    label: _D('Tap (domestic)','नल (घरेलू)','কল (পারিবারিক)') },
      { value:'tap_public',      label: _D('Tap (public)','नल (सार्वजनिक)','কল (সার্বজনীন)') },
      { value:'other',           label: _D('Other','अन्य','অন্য') },
    ]},

  { id:'d2_water_source_washing', deck:'2', section:'water', type:'radio',
    label: _D('Source of Washing & Bathing Water', 'धुलाई/नहाने के पानी का स्रोत', 'ধোয়া ও স্নানের জলের উৎস'),
    options: [
      { value:'same',   label: _D('Same as drinking','पीने जैसा','পানীয় জলের মতো') },
      { value:'river',  label: _D('River/Pond','नदी/तालाब','নদী/পুকুর') },
      { value:'public', label: _D('Public tap/well','सार्वजनिक नल/कुआँ','সার্বজনীন কল/কূপ') },
      { value:'other',  label: _D('Other','अन्य','অন্য') },
    ]},

  { id:'d2_water_distance', deck:'2', section:'water', type:'text',
    label: _D('Distance of Drinking Water Source (if outside house)', 'पीने के पानी के स्रोत की दूरी (घर से बाहर होने पर)', 'পানীয় জলের উৎসের দূরত্ব (বাড়ির বাইরে হলে)'),
    placeholder: _D('e.g. 50 metres','जैसे 50 मीटर','যেমন ৫০ মিটার') },

  { id:'d2_supply_duration', deck:'2', section:'water', type:'radio',
    label: _D('Duration of Water Supply', 'जल आपूर्ति की अवधि', 'জল সরবরাহের সময়'),
    options: [
      { value:'continuous',   label: _D('Continuous (24 hrs)','लगातार (24 घंटे)','ক্রমাগত (২৪ ঘণ্টা)') },
      { value:'intermittent', label: _D('Intermittent','रुक-रुक कर','মাঝে মাঝে') },
    ]},

  { id:'d2_supply_adequacy', deck:'2', section:'water', type:'radio',
    label: _D('Adequacy of Water Supply', 'जल आपूर्ति की पर्याप्तता', 'জল সরবরাহের পর্যাপ্ততা'),
    options: [
      { value:'adequate',   label: _D('Adequate','पर्याप्त','পর্যাপ্ত') },
      { value:'inadequate', label: _D('Inadequate','अपर्याप्त','অপর্যাপ্ত') },
    ]},

  { id:'d2_water_storage', deck:'2', section:'water', type:'table',
    label: _D('Water Collection & Storage Vessels', 'पानी भरने व रखने के बर्तन', 'জল বহন ও সংরক্ষণের পাত্র'),
    addRowLabel: _D('Add Vessel', 'बर्तन जोड़ें', 'পাত্র যোগ করুন'),
    columns: [
      { key:'pattern', label: _D('Pattern','प्रकार','ধরন'), type:'text' },
      { key:'carry_type',    label: _D('Carry vessel type','भरने का बर्तन','বহনের পাত্র'), type:'text' },
      { key:'carry_covered', label: _D('Carry: covered?','ढका हुआ?','ঢাকা?'), type:'select', options:yesNo },
      { key:'carry_clean',   label: _D('Carry: cleaned?','साफ?','পরিষ্কার?'), type:'select', options:yesNo },
      { key:'store_type',    label: _D('Store vessel type','रखने का बर्तन','রাখার পাত্র'), type:'text' },
      { key:'store_covered', label: _D('Store: covered?','ढका हुआ?','ঢাকা?'), type:'select', options:yesNo },
      { key:'store_clean',   label: _D('Store: cleaned?','साफ?','পরিষ্কার?'), type:'select', options:yesNo },
    ]},

  { id:'d2_water_draw_method', deck:'2', section:'water', type:'radio',
    label: _D('Method of Drawing Drinking Water from Storage', 'भंडारण से पानी निकालने का तरीका', 'সংরক্ষণ থেকে পানীয় জল তোলার পদ্ধতি'),
    options: [
      { value:'safe',   label: _D('Safe (ladle/tap)','सुरक्षित (ढक्कन/नल)','নিরাপদ (চামচ/কল)') },
      { value:'unsafe', label: _D('Unsafe (hand dipping)','असुरक्षित (हाथ डुबोकर)','অনিরাপদ (হাত ডুবিয়ে)') },
    ]},

  { id:'d2_hand_dipping', deck:'2', section:'water', type:'radio',
    label: _D('Hand Dipping Present While Drawing Water?', 'पानी निकालते समय हाथ डुबोना?', 'জল তোলার সময় হাত ডোবানো?'),
    options: yesNo },

  { id:'d2_water_replacement', deck:'2', section:'water', type:'text',
    label: _D('Frequency of Water Replacement in Vessels', 'बर्तनों में पानी बदलने की आवृत्ति', 'পাত্রে জল পরিবর্তনের ফ্রিকোয়েন্সি'),
    placeholder: _D('e.g. daily, every 2 days','जैसे रोज, 2 दिन में एक बार','যেমন প্রতিদিন, প্রতি ২ দিন') },

  { id:'d2_water_treatment', deck:'2', section:'water', type:'radio',
    label: _D('Is drinking water given any special treatment at household level?', 'घर पर पीने के पानी को कोई विशेष उपचार दिया जाता है?', 'ঘরে পানীয় জলে কোনো বিশেষ ব্যবস্থা করা হয়?'),
    options: yesNo },

  { id:'d2_water_treatment_method', deck:'2', section:'water', type:'multiselect',
    label: _D('Treatment Method', 'उपचार की विधि', 'জল পরিশোধনের পদ্ধতি'),
    conditional: { field:'d2_water_treatment', value:'yes' },
    options: [
      { value:'boiling',       label: _D('Boiling','उबालना','ফোটানো') },
      { value:'filtration',    label: _D('Domestic Filtration','घरेलू छलनी','পারিবারিক ছাঁকন') },
      { value:'chlorination',  label: _D('Chlorination','क्लोरीनीकरण','ক্লোরিনেশন') },
    ]},

  { id:'d2_chlorine_tab', deck:'2', section:'water', type:'radio',
    label: _D('Supply of chlorine tablets by health authorities / NGOs?', 'स्वास्थ्य अधिकारियों/NGO द्वारा क्लोरीन टैबलेट दी जाती है?', 'স্বাস্থ্য কর্তৃপক্ষ/এনজিও দ্বারা ক্লোরিন ট্যাবলেট সরবরাহ?'),
    options: yesNo },

  { id:'d2_tubewell_latrine_dist', deck:'2', section:'water', type:'text',
    label: _D('If shallow tubewell present: distance from latrine', 'उथले नलकूप की शौचालय से दूरी', 'অগভীর নলকূপ থাকলে: পায়খানা থেকে দূরত্ব') },

  { id:'d2_h7_excreta', deck:'2', section:'excreta', type:'heading',
    label: _D('Excreta Disposal', 'मल निपटान', 'মলত্যাগ ব্যবস্থাপনা') },

  { id:'d2_latrine_present', deck:'2', section:'excreta', type:'radio',
    label: _D('Latrine Present?', 'शौचालय उपलब्ध?', 'পায়খানা আছে?'),
    options: [
      { value:'present', label: _D('Present','उपस्थित','আছে') },
      { value:'absent',  label: _D('Absent','अनुपस्थित','নেই') },
    ]},

  { id:'d2_latrine_location', deck:'2', section:'excreta', type:'radio',
    label: _D('Latrine Location', 'शौचालय की स्थिति', 'পায়খানার অবস্থান'),
    conditional: { field:'d2_latrine_present', value:'present' },
    options: [
      { value:'inside',  label: _D('Within house','घर के अंदर','বাড়ির ভেতরে') },
      { value:'outside', label: _D('Outside house','घर के बाहर','বাড়ির বাইরে') },
    ]},

  { id:'d2_latrine_outside_distance', deck:'2', section:'excreta', type:'text',
    label: _D('Distance from house (if outside)', 'घर से दूरी (बाहर होने पर)', 'বাড়ি থেকে দূরত্ব (বাইরে হলে)'),
    conditional: { field:'d2_latrine_location', value:'outside' } },

  { id:'d2_latrine_type', deck:'2', section:'excreta', type:'radio',
    label: _D('Latrine Type (sanitation level)', 'शौचालय का प्रकार (स्वच्छता स्तर)', 'পায়খানার ধরন (স্বাস্থ্যবিধি মান)'),
    conditional: { field:'d2_latrine_present', value:'present' },
    options: [
      { value:'sanitary',     label: _D('Sanitary (properly sealed/flushed)','स्वास्थ्यकर','স্বাস্থ্যসম্মত') },
      { value:'not_sanitary', label: _D('Not Sanitary','अस्वास्थ्यकर','স্বাস্থ্যসম্মত নয়') },
    ]},

  { id:'d2_latrine_use', deck:'2', section:'excreta', type:'radio',
    label: _D('Latrine Use Type', 'शौचालय के उपयोग का प्रकार', 'পায়খানার ব্যবহারের ধরন'),
    conditional: { field:'d2_latrine_present', value:'present' },
    options: [
      { value:'personal',   label: _D('Personal / Family','व्यक्तिगत/परिवारिक','ব্যক্তিগত/পারিবারিক') },
      { value:'community',  label: _D('Community (shared)','सामुदायिक','সামুদায়িক') },
    ]},

  { id:'d2_latrine_users', deck:'2', section:'excreta', type:'number',
    label: _D('If Community: Number of users', 'सामुदायिक होने पर: उपयोगकर्ताओं की संख्या', 'সামুদায়িক হলে: ব্যবহারকারীর সংখ্যা'),
    conditional: { field:'d2_latrine_use', value:'community' } },

  { id:'d2_defecation_open', deck:'2', section:'excreta', type:'radio',
    label: _D('Where do family members defecate (if no latrine)?', 'शौचालय न होने पर परिवार के सदस्य कहाँ शौच करते हैं?', 'পায়খানা না থাকলে পরিবারের সদস্যরা কোথায় শৌচ করেন?'),
    conditional: { field:'d2_latrine_present', value:'absent' },
    options: [
      { value:'open_field', label: _D('Open field','खुले मैदान में','খোলা মাঠে') },
      { value:'other',      label: _D('Other (specify in notes)','अन्य','অন্য') },
    ]},

  { id:'d2_handwash_latrine', deck:'2', section:'excreta', type:'radio',
    label: _D('Handwashing facility with soap inside latrine?', 'शौचालय में साबुन से हाथ धोने की सुविधा?', 'পায়খানায় সাবান দিয়ে হাত ধোয়ার সুবিধা?'),
    options: yesNo },

  { id:'d2_handwash_where', deck:'2', section:'excreta', type:'textarea',
    label: _D('If no handwash in latrine, where do they wash hands?', 'शौचालय में सुविधा न हो तो हाथ कहाँ धोते हैं?', 'পায়খানায় না থাকলে হাত কোথায় ধোয়?'),
    conditional: { field:'d2_handwash_latrine', value:'no' } },

  { id:'d2_under5_defecation', deck:'2', section:'excreta', type:'textarea',
    label: _D('Place of defecation for children under 5', '5 वर्ष से कम बच्चों का शौच स्थान', '৫ বছরের কম শিশুর শৌচের স্থান') },

  { id:'d2_under5_disposal', deck:'2', section:'excreta', type:'textarea',
    label: _D('Mode of disposal of excreta of children under 5', '5 वर्ष से कम बच्चों का मल निपटान', '৫ বছরের কম শিশুর মল নিষ্কাশনের পদ্ধতি') },

  { id:'d2_latrine_cleaning', deck:'2', section:'excreta', type:'radio',
    label: _D('Regular cleaning arrangement for latrine?', 'शौचालय की नियमित सफाई की व्यवस्था?', 'পায়খানা নিয়মিত পরিষ্কারের ব্যবস্থা?'),
    options: yesNo },

  { id:'d2_h8_refuse', deck:'2', section:'refuse', type:'heading',
    label: _D('Refuse Disposal', 'कचरा निपटान', 'আবর্জনা নিষ্কাশন') },

  { id:'d2_refuse_method', deck:'2', section:'refuse', type:'radio',
    label: _D('How do people dispose of refuse?', 'लोग कचरे का निपटान कैसे करते हैं?', 'লোকেরা আবর্জনা কীভাবে ফেলেন?'),
    options: [
      { value:'indiscriminate', label: _D('Throw indiscriminately','इधर-उधर फेंकते हैं','যেখানে-সেখানে ফেলেন') },
      { value:'common_pit',     label: _D('Common pit','सामुदायिक गड्ढे में','সামুদায়িক গর্তে') },
      { value:'container',      label: _D('Collected in container','बर्तन/डिब्बे में','পাত্রে সংগ্রহ') },
      { value:'burning',        label: _D('Burning','जलाते हैं','পোড়ানো') },
      { value:'composting',     label: _D('Composting','खाद बनाते हैं','সার তৈরি') },
      { value:'municipal',      label: _D('Municipal service','नगर पालिका सेवा','পৌরসভার সেবা') },
    ]},

  { id:'d2_kitchen_waste_solid', deck:'2', section:'refuse', type:'textarea',
    label: _D('Solid Kitchen Waste Disposal', 'ठोस रसोई कचरे का निपटान', 'কঠিন রান্নাঘরের বর্জ্য নিষ্কাশন') },

  { id:'d2_kitchen_waste_liquid', deck:'2', section:'refuse', type:'textarea',
    label: _D('Sullage (Liquid Waste) Disposal', 'गंदे पानी (सल्लेज) का निपटान', 'নর্দমার জল নিষ্কাশন') },

  { id:'d2_sanitary_napkin_disposal', deck:'2', section:'refuse', type:'textarea',
    label: _D('How are used sanitary napkins disposed?', 'प्रयुक्त सेनेटरी नैपकिन का निपटान कैसे होता है?', 'ব্যবহৃত স্যানিটারি ন্যাপকিন কীভাবে ফেলা হয়?') },

  { id:'d2_h9_hygiene', deck:'2', section:'hygiene', type:'heading',
    label: _D('Room Hygiene & Accident Hazards', 'कमरे की सफाई और दुर्घटना खतरे', 'ঘরের স্বাস্থ্যবিধি ও দুর্ঘটনার ঝুঁকি') },

  { id:'d2_floor_mopping', deck:'2', section:'hygiene', type:'radio',
    label: _D('Frequency of Floor Mopping', 'फर्श पोंछने की आवृत्ति', 'মেঝে মোছার ফ্রিকোয়েন্সি'),
    options: [
      { value:'daily',       label: _D('Daily','रोज','প্রতিদিন') },
      { value:'alternate',   label: _D('Alternate days','एक दिन छोड़कर','একদিন পর পর') },
      { value:'weekly',      label: _D('Weekly','साप्ताहिक','সাপ্তাহিক') },
      { value:'less',        label: _D('Less frequent','कम बार','কম') },
    ]},

  { id:'d2_mopping_method', deck:'2', section:'hygiene', type:'radio',
    label: _D('Mopping Method', 'पोंछने का तरीका', 'মোছার পদ্ধতি'),
    options: [
      { value:'water_only',   label: _D('Water only','केवल पानी','শুধু জল') },
      { value:'water_phenyl', label: _D('Water + Phenyl/Disinfectant','पानी + फिनाइल','জল + ফেনাইল') },
      { value:'other',        label: _D('Other','अन्य','অন্য') },
    ]},

  { id:'d2_accident_hazards', deck:'2', section:'hygiene', type:'textarea',
    label: _D('Any Accident Hazards Identified', 'कोई दुर्घटना खतरा पहचाना?', 'কোনো দুর্ঘটনার ঝুঁকি চিহ্নিত?') },

  { id:'d2_problems', deck:'2', section:'summary', type:'textarea',
    label: _D('Problems Identified (bullet points)', 'समस्याएँ (बिंदुओं में)', 'চিহ্নিত সমস্যা (বুলেট পয়েন্টে)') },
];

// ─────────────────────────────────────────
// DECK 3 — KAP
// ─────────────────────────────────────────
const DECK3 = [
  { id:'d3_respondent', deck:'3', section:'intro', type:'text',
    label: _D('Respondent Name', 'उत्तरदाता का नाम', 'উত্তরদাতার নাম') },

  { id:'d3_h1_communicable', deck:'3', section:'communicable', type:'heading',
    label: _D('Knowledge — Communicable Diseases', 'ज्ञान — संचारी रोग', 'জ্ঞান — সংক্রামক রোগ') },

  { id:'d3_comm_disease_table', deck:'3', section:'communicable', type:'table',
    label: _D('Knowledge about Communicable Diseases (causation, transmission, prevention)', 'संचारी रोगों के बारे में ज्ञान', 'সংক্রামক রোগ সম্পর্কে জ্ঞান'),
    addRowLabel: _D('Add Disease', 'रोग जोड़ें', 'রোগ যোগ করুন'),
    columns: [
      { key:'disease',      label: _D('Disease (Ever Heard?)','रोग (जाना है?)','রোগ (শুনেছেন?)'), type:'text' },
      { key:'ever_heard',   label: _D('Ever Heard Y/N','জানেন হ্যাঁ/না','জেনেছেন Y/N'),      type:'select', options:yesNo },
      { key:'causation',    label: _D('Causation / Transmission','कारण/प्रसार','কারণ/বিস্তার'), type:'text' },
      { key:'prevention',   label: _D('Prevention & Treatment','रोकथाम व उपचार','প্রতিরোধ ও চিকিৎসা'), type:'text' },
    ]},

  { id:'d3_comm_care_seeking', deck:'3', section:'communicable', type:'textarea',
    label: _D('Care Seeking Behaviour for Communicable Diseases (past & present)', 'संचारी रोगों के लिए स्वास्थ्य सेवा खोजने का व्यवहार', 'সংক্রামক রোগের জন্য স্বাস্থ্যসেবা গ্রহণের আচরণ') },

  { id:'d3_h2_noncommunicable', deck:'3', section:'noncommunicable', type:'heading',
    label: _D('Knowledge — Non-Communicable Diseases', 'ज्ञान — असंचारी रोग', 'জ্ঞান — অসংক্রামক রোগ') },

  { id:'d3_ncd_table', deck:'3', section:'noncommunicable', type:'table',
    label: _D('Knowledge about Non-Communicable Diseases', 'असंचारी रोगों के बारे में ज्ञान', 'অসংক্রামক রোগ সম্পর্কে জ্ঞান'),
    addRowLabel: _D('Add Disease', 'रोग जोड़ें', 'রোগ যোগ করুন'),
    columns: [
      { key:'disease',     label: _D('Disease','रोग','রোগ'),       type:'text' },
      { key:'ever_heard',  label: _D('Ever Heard Y/N','जाना है?','জানেন?'), type:'select', options:yesNo },
      { key:'risk_factors',label: _D('Risk Factors','जोखिम कारक','ঝুঁকির কারণ'), type:'text' },
      { key:'prevention',  label: _D('Prevention','रोकथाम','প্রতিরোধ'), type:'text' },
    ]},

  { id:'d3_ncd_care_seeking', deck:'3', section:'noncommunicable', type:'textarea',
    label: _D('Care Seeking Behaviour for Non-Communicable Diseases', 'असंचारी रोगों के लिए स्वास्थ्य सेवा व्यवहार', 'অসংক্রামক রোগের জন্য স্বাস্থ্যসেবা গ্রহণ') },

  { id:'d3_h3_visits', deck:'3', section:'care_seeking', type:'heading',
    label: _D('Health Facility Visits', 'स्वास्थ्य सुविधा दौरे', 'স্বাস্থ্য কেন্দ্রে যাওয়া') },

  { id:'d3_minor_ailment', deck:'3', section:'care_seeking', type:'radio',
    label: _D('For minor ailments, which facility do they prefer?', 'मामूली बीमारी के लिए कहाँ जाते हैं?', 'ছোটখাট অসুস্থতায় কোথায় যান?'),
    options: [
      { value:'private', label: _D('Private','निजी','বেসরকারি') },
      { value:'govt',    label: _D('Government','सरकारी','সরকারি') },
      { value:'chemist', label: _D('Medicine Shop','दवा दुकान','ওষুধের দোকান') },
      { value:'ngo',     label: _D('NGO/Other','NGO/अन्य','এনজিও/অন্য') },
    ]},

  { id:'d3_major_ailment', deck:'3', section:'care_seeking', type:'radio',
    label: _D('For major ailments, which facility do they prefer?', 'गंभीर बीमारी के लिए कहाँ जाते हैं?', 'গুরুতর অসুস্থতায় কোথায় যান?'),
    options: [
      { value:'private', label: _D('Private','निजी','বেসরকারি') },
      { value:'govt',    label: _D('Government','सरकारी','সরকারি') },
      { value:'chemist', label: _D('Medicine Shop','दवा दुकान','ওষুধের দোকান') },
      { value:'ngo',     label: _D('NGO/Other','NGO/अन्य','এনজিও/অন্য') },
    ]},

  { id:'d3_antenatal_care', deck:'3', section:'care_seeking', type:'textarea',
    label: _D('For antenatal/natal/postnatal care, where do they go?', 'प्रसव से पहले/दौरान/बाद देखभाल के लिए कहाँ जाते हैं?', 'প্রসবপূর্ব/প্রসব/প্রসবোত্তর সেবার জন্য কোথায় যান?') },

  { id:'d3_preventive_services', deck:'3', section:'care_seeking', type:'textarea',
    label: _D('For preventive services (immunisation, family planning etc.), where?', 'निवारक सेवाओं (टीकाकरण, परिवार नियोजन) के लिए कहाँ?', 'প্রতিরোধমূলক সেবার (টিকা, পরিবার পরিকল্পনা) জন্য কোথায়?') },

  { id:'d3_system_preference', deck:'3', section:'care_seeking', type:'radio',
    label: _D('Which medical system is preferable to the family?', 'परिवार किस चिकित्सा पद्धति को प्राथमिकता देता है?', 'পরিবার কোন চিকিৎসা পদ্ধতি পছন্দ করে?'),
    options: [
      { value:'allopathy', label: _D('Allopathy','एलोपैथी','অ্যালোপ্যাথি') },
      { value:'ayush',     label: _D('AYUSH (Ayurveda/Homeopathy/etc.)','आयुष','আয়ুষ') },
      { value:'both',      label: _D('Both','दोनों','উভয়') },
    ]},

  { id:'d3_not_visiting_reasons', deck:'3', section:'care_seeking', type:'textarea',
    label: _D('If health facilities not visited regularly, reasons', 'स्वास्थ्य सेवा नियमित रूप से न लेने के कारण', 'নিয়মিত স্বাস্থ্য কেন্দ্রে না গেলে কারণ') },

  { id:'d3_h4_antenatal', deck:'3', section:'antenatal', type:'heading',
    label: _D('Reproductive & Child Health — Antenatal Practices', 'प्रजनन व बाल स्वास्थ्य — प्रसव-पूर्व अभ्यास', 'প্রজনন ও শিশু স্বাস্থ্য — প্রসবপূর্ব অনুশীলন') },

  { id:'d3_antenatal_table', deck:'3', section:'antenatal', type:'table',
    label: _D('Antenatal Knowledge & Practice', 'प्रसव-पूर्व ज्ञान और अभ्यास', 'প্রসবপূর্ব জ্ঞান ও অনুশীলন'),
    addRowLabel: _D('Add Item', 'मद जोड़ें', 'মদ যোগ করুন'),
    columns: [
      { key:'item',      label: _D('Item','विषय','বিষয়'),          type:'text' },
      { key:'knowledge', label: _D('Knowledge','ज्ञान','জ্ঞান'),    type:'textarea' },
      { key:'practice',  label: _D('Practice','अभ्यास','অনুশীলন'), type:'textarea' },
    ]},

  { id:'d3_antenatal_deviation', deck:'3', section:'antenatal', type:'textarea',
    label: _D('Reasons for deviation of practice from knowledge (antenatal)', 'ज्ञान व अभ्यास में अंतर के कारण (प्रसव-पूर्व)', 'জ্ঞান ও অনুশীলনের পার্থক্যের কারণ (প্রসবপূর্ব)') },

  { id:'d3_h5_postnatal', deck:'3', section:'postnatal', type:'heading',
    label: _D('Postnatal Practices', 'प्रसवोत्तर अभ्यास', 'প্রসবোত্তর অনুশীলন') },

  { id:'d3_postnatal_table', deck:'3', section:'postnatal', type:'table',
    label: _D('Postnatal Knowledge & Practice', 'प्रसवोत्तर ज्ञान और अभ्यास', 'প্রসবোত্তর জ্ঞান ও অনুশীলন'),
    addRowLabel: _D('Add Item', 'मद जोड़ें', 'মদ যোগ করুন'),
    columns: [
      { key:'item',      label: _D('Item','विषय','বিষয়'),          type:'text' },
      { key:'knowledge', label: _D('Knowledge','ज्ञान','জ্ঞান'),    type:'textarea' },
      { key:'practice',  label: _D('Practice','अभ्यास','অনুশীলন'), type:'textarea' },
    ]},

  { id:'d3_postnatal_deviation', deck:'3', section:'postnatal', type:'textarea',
    label: _D('Reasons for deviation (postnatal)', 'अंतर के कारण (प्रसवोत्तर)', 'পার্থক্যের কারণ (প্রসবোত্তর)') },

  { id:'d3_h6_feeding', deck:'3', section:'feeding', type:'heading',
    label: _D('Child Feeding Practices', 'बच्चे को दूध पिलाने की प्रथाएँ', 'শিশু খাওয়ানোর অনুশীলন') },

  { id:'d3_feeding_table', deck:'3', section:'feeding', type:'table',
    label: _D('Child Feeding — Knowledge & Practice', 'शिशु आहार — ज्ञान और अभ्यास', 'শিশু খাওয়ানো — জ্ঞান ও অনুশীলন'),
    addRowLabel: _D('Add Item', 'मद जोड़ें', 'মদ যোগ করুন'),
    columns: [
      { key:'item',      label: _D('Item','विषय','বিষয়'),          type:'text' },
      { key:'knowledge', label: _D('Knowledge','ज्ञान','জ্ঞান'),    type:'textarea' },
      { key:'practice',  label: _D('Practice','अभ्यास','অনুশীলন'), type:'textarea' },
    ]},

  { id:'d3_h7_family_planning', deck:'3', section:'family_planning', type:'heading',
    label: _D('Family Planning Practices', 'परिवार नियोजन अभ्यास', 'পরিবার পরিকল্পনা অনুশীলন') },

  { id:'d3_fp_table', deck:'3', section:'family_planning', type:'table',
    label: _D('Family Planning — Knowledge & Practice', 'परिवार नियोजन — ज्ञान और अभ्यास', 'পরিবার পরিকল্পনা — জ্ঞান ও অনুশীলন'),
    addRowLabel: _D('Add Item', 'मद जोड़ें', 'মদ যোগ করুন'),
    columns: [
      { key:'item',      label: _D('Item','विषय','বিষয়'),          type:'text' },
      { key:'knowledge', label: _D('Knowledge','ज्ञान','জ্ঞান'),    type:'textarea' },
      { key:'practice',  label: _D('Practice (past & present)','अभ्यास','অনুশীলন (অতীত ও বর্তমান)'), type:'textarea' },
    ]},

  { id:'d3_gender_preference', deck:'3', section:'family_planning', type:'radio',
    label: _D('Is there gender preference for children?', 'बच्चों के लिंग की प्राथमिकता है?', 'সন্তানের লিঙ্গে কোনো পছন্দ আছে?'),
    options: [
      { value:'no',   label: _D('No preference','कोई प्राथमिकता नहीं','কোনো পছন্দ নেই') },
      { value:'male', label: _D('Prefer male','लड़का पसंद','ছেলে পছন্দ') },
      { value:'female',label:_D('Prefer female','लड़की पसंद','মেয়ে পছন্দ') },
    ]},

  { id:'d3_fp_deviation', deck:'3', section:'family_planning', type:'textarea',
    label: _D('Reasons for deviation in knowledge and practice (family planning)', 'ज्ञान और अभ्यास में अंतर के कारण (परिवार नियोजन)', 'জ্ঞান ও অনুশীলনের পার্থক্যের কারণ (পরিবার পরিকল্পনা)') },

  { id:'d3_h8_hygiene', deck:'3', section:'personal_hygiene', type:'heading',
    label: _D('Personal Hygiene Practice', 'व्यक्तिगत स्वच्छता अभ्यास', 'ব্যক্তিগত স্বাস্থ্যবিধি অনুশীলন') },

  { id:'d3_hygiene_table', deck:'3', section:'personal_hygiene', type:'table',
    label: _D('Personal Hygiene — Per Family Member', 'व्यक्तिगत स्वच्छता — प्रत्येक सदस्य के लिए', 'ব্যক্তিগত স্বাস্থ্যবিধি — প্রতিটি সদস্যের জন্য'),
    addRowLabel: _D('Add Member', 'सदस्य जोड़ें', 'সদস্য যোগ করুন'),
    columns: [
      { key:'member',           label: _D('Member name/no','सदस्य','সদস্য'), type:'text' },
      { key:'wash_before_food', label: _D('Handwash before food (soap)','खाने से पहले हाथ धोना (साबुन)','খাবার আগে হাত ধোয় (সাবান)'), type:'select', options:yesNo },
      { key:'wash_after_toilet',label: _D('Handwash after toilet (soap)','शौच बाद हाथ धोना (साबुन)','টয়লেটের পর হাত ধোয় (সাবান)'), type:'select', options:yesNo },
      { key:'footwear',         label: _D('Wears footwear outside','बाहर जूते पहनता है','বাইরে জুতো পরে'), type:'select', options:yesNo },
      { key:'brush_twice',      label: _D('Brushes teeth twice daily','दिन में दो बार दांत साफ करता है','দিনে দুবার দাঁত মাজে'), type:'select', options:yesNo },
      { key:'washed_clothes',   label: _D('Wears washed clothes','धुले कपड़े पहनता है','ধোয়া কাপড় পরে'), type:'select', options:yesNo },
      { key:'cut_nails',        label: _D('Cuts nails regularly','नाखून नियमित काटता है','নিয়মিত নখ কাটে'), type:'select', options:yesNo },
      { key:'clean_water',      label: _D('Drinks clean/safe water','साफ पानी पीता है','পরিষ্কার জল পান করে'), type:'select', options:yesNo },
    ]},

  { id:'d3_h9_menstrual', deck:'3', section:'menstrual', type:'heading',
    label: _D('Menstrual Hygiene Knowledge & Practice', 'मासिक धर्म स्वच्छता — ज्ञान और अभ्यास', 'মাসিক স্বাস্থ্যবিধি — জ্ঞান ও অনুশীলন') },

  { id:'d3_menstrual_material', deck:'3', section:'menstrual', type:'radio',
    label: _D('What protective material should be used during menstruation?', 'मासिक धर्म के दौरान कौन सी सुरक्षात्मक सामग्री उपयोग करनी चाहिए?', 'মাসিকের সময় কোন সুরক্ষা সামগ্রী ব্যবহার করা উচিত?'),
    options: [
      { value:'sanitary_pad',   label: _D('Sanitary Pads','सेनेटरी पैड','স্যানিটারি প্যাড') },
      { value:'new_cloth',      label: _D('New Cloth','नया कपड़ा','নতুন কাপড়') },
      { value:'old_washed',     label: _D('Old Washed Cloth','पुराना धुला कपड़ा','পুরনো ধোয়া কাপড়') },
      { value:'pad_old_cloth',  label: _D('Pad + Old Washed Cloth','पैड + पुराना कपड़ा','প্যাড + পুরনো কাপড়') },
      { value:'pad_new_cloth',  label: _D('Pad + New Cloth','पैड + नया कपड़ा','প্যাড + নতুন কাপড়') },
      { value:'other',          label: _D('Other','अन्य','অন্য') },
    ]},

  { id:'d3_menstrual_material_used', deck:'3', section:'menstrual', type:'radio',
    label: _D('What do they ACTUALLY use?', 'वास्तव में क्या उपयोग करते हैं?', 'বাস্তবে কী ব্যবহার করেন?'),
    options: [
      { value:'sanitary_pad',   label: _D('Sanitary Pads','सेनेटरी पैड','স্যানিটারি প্যাড') },
      { value:'new_cloth',      label: _D('New Cloth','नया कपड़ा','নতুন কাপড়') },
      { value:'old_washed',     label: _D('Old Washed Cloth','पुराना धुला कपड़ा','পুরনো ধোয়া কাপড়') },
      { value:'pad_old_cloth',  label: _D('Pad + Old Washed Cloth','पैड + पुराना कपड़ा','প্যাড + পুরনো কাপড়') },
      { value:'pad_new_cloth',  label: _D('Pad + New Cloth','पैड + नया कपड़ा','প্যাড + নতুন কাপড়') },
      { value:'other',          label: _D('Other','अन्य','অন্য') },
    ]},

  { id:'d3_menstrual_disposal', deck:'3', section:'menstrual', type:'radio',
    label: _D('How and where should used material be disposed?', 'प्रयुक्त सामग्री का निपटान कैसे और कहाँ होना चाहिए?', 'ব্যবহৃত সামগ্রী কীভাবে ও কোথায় ফেলা উচিত?'),
    options: [
      { value:'wrap_open',    label: _D('Wrap & dispose into open area','लपेटकर खुले में फेंकना','মুড়িয়ে খোলা জায়গায় ফেলা') },
      { value:'wrap_closed',  label: _D('Wrap & dispose into closed dustbin','लपेटकर बंद डस्टबिन में','মুড়িয়ে বদ্ধ ডাস্টবিনে') },
      { value:'latrine',      label: _D('Dispose into sanitary latrine','स्वच्छ शौचालय में','স্বাস্থ্যসম্মত পায়খানায়') },
      { value:'water_body',   label: _D('Dispose into pond/drain','तालाब/नाली में','পুকুর/নর্দমায়') },
    ]},

  { id:'d3_menstrual_disposal_actual', deck:'3', section:'menstrual', type:'radio',
    label: _D('How and where do they ACTUALLY dispose it?', 'वास्तव में कैसे और कहाँ निपटाते हैं?', 'বাস্তবে কীভাবে ও কোথায় ফেলেন?'),
    options: [
      { value:'wrap_open',    label: _D('Wrap & dispose into open area','लपेटकर खुले में फेंकना','মুড়িয়ে খোলা জায়গায় ফেলা') },
      { value:'wrap_closed',  label: _D('Wrap & dispose into closed dustbin','लपेटकर बंद डस्टबिन में','মুড়িয়ে বদ্ধ ডাস্টবিনে') },
      { value:'latrine',      label: _D('Dispose into sanitary latrine','स्वच्छ शौचालय में','স্বাস্থ্যসম্মত পায়খানায়') },
      { value:'water_body',   label: _D('Dispose into pond/drain','तालाब/नाली में','পুকুর/নর্দমায়') },
    ]},

  { id:'d3_menstrual_source', deck:'3', section:'menstrual', type:'multiselect',
    label: _D('Where do they get menstrual materials from?', 'मासिक सामग्री कहाँ से मिलती है?', 'মাসিকের সামগ্রী কোথা থেকে পান?'),
    options: [
      { value:'chemist',     label: _D('Chemist shop','दवा दुकान','ওষুধের দোকান') },
      { value:'home',        label: _D('Home (cloth)','घर (कपड़ा)','বাড়ি (কাপড়)') },
      { value:'stationary',  label: _D('Stationery/grocery shop','किराना दुकान','মুদি দোকান') },
      { value:'other',       label: _D('Other','अन्य','অন্য') },
    ]},

  { id:'d3_problems', deck:'3', section:'summary', type:'textarea',
    label: _D('Problems Identified (bullet points)', 'समस्याएँ (बिंदुओं में)', 'চিহ্নিত সমস্যা (বুলেট পয়েন্টে)') },
];

// ─────────────────────────────────────────
// COMBINED EXPORT (Decks 1–3 here; 4–8 appended by data_decks_4_8.js)
// ─────────────────────────────────────────
export const SURVEY_DATA_1_3 = [...DECK1, ...DECK2, ...DECK3];
