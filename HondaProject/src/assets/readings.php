<?php
  // Data generation

  $array = array();
  
  $array['DRIP_FR_L'] = lcg_value(); // random values between 0 and 1
  $array['DRIP_FR_R'] = lcg_value();
  $array['DRIP_RE_L'] = lcg_value();
  $array['DRIP_RE_R'] = lcg_value();

  // $array['sen2_pt1'] = rand(-15,15);
  // $array['sen2_pt2'] = rand(-15,15);
  // $array['sen2_pt3'] = rand(-15,15);
  // $array['sen2_pt4'] = rand(-15,15);

  $array['B-Pitch_Front'] = lcg_value();  // random values between 0 and 1
  $array['B-Pitch_Rear'] = lcg_value();

  $array['B_FR_L'] = lcg_value();
  $array['B_FR_R'] = lcg_value();
  $array['B_RE_L'] = lcg_value();
  $array['B_RE_R'] = lcg_value();
  

  header('Content-type: application/json');
  echo json_encode($array);

?>