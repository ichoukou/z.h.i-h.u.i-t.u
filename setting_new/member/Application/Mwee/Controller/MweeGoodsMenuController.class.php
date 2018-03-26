<?php
/**
 * Created by PhpStorm.
 * User: zhangkaifeng
 * Date: 19/07/2017
 * Time: 10:05
 */

namespace Mwee\Controller;


use Common\Controller\CommonController;
use Mwee\Service\GoodsMenuService;

class MweeGoodsMenuController extends CommonController
{
    public function _initialize()
    {
        parent::__initialize(); // TODO: Change the autogenerated stub
    }


    /**
     * 查询商家所有菜单信息
     */
    public function goodsMenu()
    {
        $params['sid'] = I('sid');

        $admininfo = $this->getMerchant($this->ukey);
        $sid = CommonMwee::poinumberToSid($params['sid'], $admininfo);
        if (false === $sid) {
            returnjson(array('code'=>102), $this->returnstyle, $this->callback);
        }


        if (in_array('', $params)){
            returnjson(array('code'=>1030), $this->returnstyle, $this->callback);
        }
        $re = GoodsMenuService::getGoodsMenu($sid);
        returnjson($re, $this->returnstyle, $this->callback);
    }
}