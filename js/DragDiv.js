$(function() {
    var DragChangeSize = {
        init: function() {
            var clickX, leftOffset, inxdex, nextW2, nextW;
            dragging = false;
            doc = document;
            dragBtn = $(".dragbox").find('label');
            wrapWidth = $(".dragbox").width();

            this.mousedown();
            this.onmousemove();
            this.mouseup();
        },
        mousedown: function() {
            var _this = this;
            dragBtn.mousedown(function(event) {
                dragging = true;
                leftOffset = $(".dragbox").offset().left;
                index = $(this).index('label');
            });
        },
        onmousemove: function() {
            $(doc).mousemove(function(e) {
                if (dragging) {
                    dragBtn.eq(index).prev().text(dragBtn.eq(index).prev().width());
                    dragBtn.eq(index).next().text(dragBtn.eq(index).next().width());
                    //----------------------------------------------------------------
                    clickX = e.pageX;
                    $("#test").text('鼠标位置：' + clickX);

                    //判断拖动的第几个按钮
                    if (index == 0) {
                        //第一个拖动按钮左边不出界
                        if (clickX > leftOffset) {
                            dragBtn.eq(index).css('left', clickX - 7 - leftOffset + 'px');
                            //按钮移动
                            dragBtn.eq(index).prev().width(clickX - leftOffset + 'px');
                            nextW2 = clickX - leftOffset;
                            dragBtn.eq(index).next().width(wrapWidth - nextW2);
                        } else {
                            dragBtn.eq(index).css('left', '0px');
                        }
                    }

                    if (clickX > (leftOffset + wrapWidth - 5)) {
                        //第一个按钮右边不出界
                        dragBtn.eq(index).css('left', parseFloat((wrapWidth - 11) + 'px'));
                        //第一个按钮，左右容器不出界
                        dragBtn.eq(index).prev().width(dragBtn.eq(index).offset().left - leftOffset + 'px');
                        dragBtn.eq(index).next().width('0px');
                    }
                }
            });

        },
        mouseup: function() {
            $(doc).mouseup(function(e) {
                dragging = false;
                e.cancelBubble = true; //禁止事件冒泡
            })
        }
    };
    DragChangeSize.init();
})