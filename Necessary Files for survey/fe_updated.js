(function () {
    "use strict";
    function Adtest(questionObject) {
        /* setup some globals */
        this.questionObject = questionObject;
        this.qLabel = this.questionObject.label;
        this.uid = this.questionObject.uid;
        this.debug = Survey.question.timertest.debug;

        /* Parent Container */
        this.$qContainer = $ ("#question_" + this.qLabel);

        /* Answer Table */
        this.$answerTable = this.$qContainer.find(".answers");
        this.$input = this.$answerTable.find("[id^='ans']");

        /* DQ Container */
        this.$dqContainer = this.$qContainer.find("#timertest_" + this.qLabel);
        this.$imageContainer = this.$dqContainer.find(".imageContainer");
        this.$counter = this.$dqContainer.find(".counter");
        this.$barFill = this.$dqContainer.find(".barFill");

        /* DQ Variables */
        this.timeLeft = this.questionObject["timertest:timerLimit"];
        this.timeTotal = this.timeLeft;
    }

    var instanceProps = {
        setup: function () {
            var self = this;
            var $csContainer = self.$qContainer.find('.sq-timertestContainer');
            var $imgC = self.$imageContainer;
            var $ol = $ ('<div/>').addClass('overlay');
            var $btn = $ ('<button/>').addClass('start-btn');
            Survey.question.commonDQ.hideSubmitButton();
            self.setupInput();
            
            self.$dqContainer.addClass('wrap');
            
            function addOverlay(){
                $btn.attr({
                        'type':'button'
                })
                .text(self.questionObject["timertest:showText"])
                .hide();
                //var $ol = $ ('<div/>').addClass('overlay');
                $ol.append($btn);
                $csContainer.prepend($ol);
            }
            
            function addImage(){
                var src = self.questionObject["timertest:image"];
                $imgC.find('img').attr('src', src);
                $imgC.css('opacity',0);
            }
            
            function addEvent(){
                
                $btn.on('click', function(){
                    var cd = 1;
                    
                    toggleFullscreen($csContainer[0]);
                    
                    $btn.remove();
                    var $cdInterval = setInterval(function(){
                        cd--;
                        if(cd){
                            $btn.text(cd);
                        } else {
                            clearInterval($cdInterval);
                            showImage();
                        }
                    },1000);
  
                });
                   
                function showImage(){  
                    $imgC.css('opacity',1);
                    $ol.hide();
                    setTimeout(function(){
                        $imgC.css('opacity',0);
                            setTimeout(function(){
                                Survey.question.commonDQ.submitSurveyPage();
                            },500);
                    },self.timeLeft);
                }
                
                function addImgEvent(){
                    var $img = $imgC.find('img');
                    
                    $img.on('click', function(){
                        toggleFullscreen(this);
                    });
                }
                
                $ (window).on('load', function(){
                    $btn.show();
                });
            }
            
            addOverlay();
            addImage();
            addEvent();
            
            // code piece requesting full screen from https://www.thewebflash.com/toggling-fullscreen-mode-using-the-html5-fullscreen-api/
            function toggleFullscreen(elem) {
              elem = elem || document.documentElement;
              if (!document.fullscreenElement && !document.mozFullScreenElement &&
                !document.webkitFullscreenElement && !document.msFullscreenElement) {
                if (elem.requestFullscreen) {
                  elem.requestFullscreen();
                } else if (elem.msRequestFullscreen) {
                  elem.msRequestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                  elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                  elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
              } else {
                if (document.exitFullscreen) {
                  document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                  document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                  document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
                }
              }
            }
            
        },
        setupInput: function () {
            var self = this;
            if (self.debug) {
                self.$answerTable.css("display","block");
            }
        },
        onCounterInterval: function() {
            var self = this;
            if (self.timeLeft > 0) {
                self.timeLeft = self.timeLeft - 1;
                self.$counter.text(self.timeLeft/10);
            }
        },
        submitPage: function() {
            var self = this;
            //self.$imageContainer.hide();
            self.$input.prop("checked", true);
            //Survey.question.commonDQ.submitSurveyPage();
        },
        resizeHandler: function () {
            var self = this;

            $ (window).on("resize", function () {
                self.scaleImage();
            });
            $ (window).trigger("resize");
        },
        scaleImage: function () {
            var self = this;

            if (!self.windowWidth || self.windowWidth > $ (window).width()) {
                self.windowWidth = $ (window).width();
            }

            self.$imageContainer.find("img").removeClass("contained");
            if (self.$imageContainer.width() >= self.windowWidth) {
                self.$imageContainer.find("img").addClass("contained");
            }
        }
    };

    $.each(instanceProps, function (k, v) {
        Adtest.prototype[k] = v;
    });

    Survey.question.timertest = {
        setup: function (questionObject) {
            var timertest = new Adtest(questionObject);
            var $msg;
            var $timertests = $ (".sq-timertest");

            /* if more than 1 ad test exists, show an error */
            if ($timertests.length > 1) {
                $timertests.hide();
                $msg = $ ("<div></div>");
                $msg.append("<p style='text-align: center'>***Ad Test Timer Error***</p>");
                $msg.append("<p>Only 1 Ad Test Timer can be shown per page.  Please add a page break between your Ad Test Timer questions.");
                $msg.append("<p><a class='fa-icon-book' style='color: #1D8AC6; font-size:14px; font-weight: bold;' target='_blank' href='http://kb.decipherinc.com/index.php?View=entry&amp;EntryID=1564'><span style='font-family: Helvetica; padding-left: 5px;'>Learn More</span></a></p>");
                $msg.dialog({
                    modal: true,
                    buttons: {
                        OK: function () {
                            $ (this).dialog("close");
                        }
                    }
                });
                return;
            }
            timertest.setup();
        }
    };
}());