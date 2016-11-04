$(function () {


    $.ppt('body')
        .theme('black')
//----0
        .addPage('startup')
        .text('Keynote for web', '.caption')
        .text('一个在线的仿 Keynote 系统', '.description')
        .text('UER 2014Q4', {right: '7%', bottom: '5%', fontSize: '.3em'})
//----1
        .addPage('chapter')
        .caption('WHY I NEED?')
//----2
        .addPage('list')
        .list(['FAST', ['GENERAL', {color: 'red'}], 'SIMPLE'], { left: '30%', top: '30%', width: '50%'})
//----3
        .addPage('caption_list_picture').caption('What-How-What')
        .list(
        [
            '大部分人在阐述自己产品的时候，采用的是这个圆圈形式的“由外而内”模式，例如推销产品时：这是我们公司的X型产品，采用最先进的9AT自动变速箱，有着良好的节油性能和操控性·······，而真正成功的模式是“由内而外”模式，传达你为什么要做这个事业或者产品，让认同你理念的人成为你的客户，认同理念，才能激励行动。',
            '伟大的企业知道感召客户、激励员工，人人都知道自己是“做什么”的，有些人知道自己是”怎么做“的，但只有极少数人知道自己”为什么“要这么做。唯有那些明白”为什么“的人，才能成为真正的领导者，唯有那些明白”为什么“的企业，才能成为真正的领军企业',
            '苹果公司的成功就是其一直在问自己：”The first thing we ask is what do we want people to feel."',
            '在制定营销策略时，运用此黄金圈，从WHY开始，再到HOW，最后再考虑WHAT。即先找到”为什么“，建立自己的核心价值理念，突出“为什么”，鲜明个性、极致追求，并始终用WHY来检验HOW与WHAT!'
        ], {fontSize: '.5em'})
        .picture('demo/a.jpg')
//----4
        .addPage('startup_picture_face')
        .caption('DESC:WHW?')
        .description('某种方法论')
        .picture('demo/a.jpg')
//----5
        .addPage('picture')
        .picture('demo/a.jpg')
//----
        .addPage('picture_three')
        .picture(['demo/a.jpg'], '.left')
        .picture(['demo/a.jpg', {right: '0', top: '0'}], '.top')
        .picture(['demo/a.jpg', {right: '0', bottom: '0'}], '.bottom')
//----
        .addPage('empty')
//----
        .addPage('reference')

        .caption('Not the best, better than nothing！')
        .description('—— webooxx')
        .addPageNumber()

        .play(0);


})