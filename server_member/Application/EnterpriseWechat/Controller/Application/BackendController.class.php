<?php
/**
 * Created by PhpStorm.
 * User: zhangkaifeng
 * Date: 2017/4/12
 * Time: 10:56
 */

namespace EnterpriseWechat\Controller\Application;


use EnterpriseWechat\Controller\Authorization\ProviderAccessTokenController;
use EnterpriseWechat\Controller\EnterprisewConfigController;

class BackendController extends EnterprisewConfigController
{
    public function _initialize()
    {
        parent::_initialize(); // TODO: Change the autogenerated stub
    }

    public function BackendManagement()
    {
        echo '这是后台管理，未做任何处理<br> code只能用一次';
//        $accessToken = $this->getAccessToken();
//        $url = $this->getlogininfo;
//        $url = str_replace('[ACCESS_TOKEN]', );
        $code = I('get.auth_code');
        $token = ProviderAccessTokenController::getToken();
        $a= GetLoginInfoController::getLoginInfo($code, $token);
        $a = json_decode($a, true);
        dump($a);
        $corpname = I('get.suite');//获取此应用的自定义的套件名称
        $db = M('enterprise_suite', 'total_');
        $find = $db->where(array('suite_name'=>$corpname))->find();
        if ($find){
////            $suitetoken = $this->getSuiteAccessToken( $find['suiteid'] );//获取应用套件令牌
//            $getPermanentCode = $this->getPermanentCode($code, $find['suiteid']);//这个code没用
//            $data['permanent_code']=$getPermanentCode['auth_corp_info']['permanent_code'];
//            $data['corpid']=$getPermanentCode['auth_corp_info']['corpid'];
//            $data['corp_name']=$getPermanentCode['auth_corp_info']['corp_name'];
//            $data['corp_type']=$getPermanentCode['auth_corp_info']['corp_type'];
//            $data['corp_round_logo_url']=$getPermanentCode['auth_corp_info']['corp_round_logo_url'];
//            $data['corp_square_logo_url']=$getPermanentCode['auth_corp_info']['corp_square_logo_url'];
//            $data['corp_user_max']=$getPermanentCode['auth_corp_info']['corp_user_max'];
//            $data['corp_agent_max']=$getPermanentCode['auth_corp_info']['corp_agent_max'];
//            $data['corp_full_name']=$getPermanentCode['auth_corp_info']['corp_full_name'];
//            $data['verified_end_time']=$getPermanentCode['auth_corp_info']['verified_end_time'];
//            $data['subject_type']=$getPermanentCode['auth_corp_info']['subject_type'];
//            $data['corp_wxqrcode']=$getPermanentCode['auth_corp_info']['corp_wxqrcode'];
//            $data['is_new_auth']=$getPermanentCode['auth_info']['is_new_auth'];
//            $data['agent']=json_encode($getPermanentCode['auth_info']['agent']);//太多，没分开，转json
//            $data['email']=$getPermanentCode['auth_user_info']['email'];
//            $data['mobile']=$getPermanentCode['auth_user_info']['mobile'];
//            $data['userid']=$getPermanentCode['auth_user_info']['userid'];
//            $dbcorp = M('enterprise_corp_info', 'total_');
//            $add = $dbcorp->add($data);
//            dump($add);
//            dump($getPermanentCode);



        }else {
            echo '没有找到套件id';
        }





    }
}