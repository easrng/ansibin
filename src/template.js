export default (h) => String.raw`<!DOCTYPE html>
<html>
  <head>
    <title>ansibin</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      #terminal pre {
        overflow: auto;
        width: 100%;
        height: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        background: var(--term-bg);
        color: var(--term-fg);
      }
      body,
      html {
        margin: 0;
        padding: 0;
      }
      * {
        box-sizing: border-box;
      }
      body {
        padding: 1rem;
        background: #48505e;
      }
      #terminal {
        width: 100%;
        height: fit-content;
        border-radius: 10px;
        overflow: hidden;
        width: fit-content;
        max-width: 100%;
        margin: 0 auto;
      }
      #terminal > pre > div {
        padding: 0.5rem 0.75rem;
        padding-top: 0;
        flex-grow: 1;
        overflow: auto;
      }
      #terminal pre::before {
        content: "o o o";
        padding: 0.5rem 0.75rem 0.5rem;
        user-select: none;
        width: fit-content;
        background: linear-gradient(
          90deg,
          var(--term-ansi-1) 0.5rem,
          var(--term-ansi-1) calc(0.5rem + 1.25em),
          var(--term-ansi-3) 0,
          var(--term-ansi-3) calc(0.5rem + 2.5em),
          var(--term-ansi-2) 0
        );
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        font-size: 1em;
      }
      #terminal ::selection {
        background: var(--term-fg);
        color: var(--term-bg);
      }
    </style>
    <style>
      .theme-default {
        --term-ansi-0: #2e3436;
        --term-ansi-1: #cc0000;
        --term-ansi-2: #4e9a06;
        --term-ansi-3: #c4a000;
        --term-ansi-4: #3465a4;
        --term-ansi-5: #75507b;
        --term-ansi-6: #06989a;
        --term-ansi-7: #d3d7cf;
        --term-ansi-8: #555753;
        --term-ansi-9: #ef2929;
        --term-ansi-10: #8ae234;
        --term-ansi-11: #fce94f;
        --term-ansi-12: #729fcf;
        --term-ansi-13: #ad7fa8;
        --term-ansi-14: #34e2e2;
        --term-ansi-15: #eeeeec;
        --term-ansi-16: #000000;
        --term-ansi-17: #00005f;
        --term-ansi-18: #000087;
        --term-ansi-19: #0000af;
        --term-ansi-20: #0000d7;
        --term-ansi-21: #0000ff;
        --term-ansi-22: #005f00;
        --term-ansi-23: #005f5f;
        --term-ansi-24: #005f87;
        --term-ansi-25: #005faf;
        --term-ansi-26: #005fd7;
        --term-ansi-27: #005fff;
        --term-ansi-28: #008700;
        --term-ansi-29: #00875f;
        --term-ansi-30: #008787;
        --term-ansi-31: #0087af;
        --term-ansi-32: #0087d7;
        --term-ansi-33: #0087ff;
        --term-ansi-34: #00af00;
        --term-ansi-35: #00af5f;
        --term-ansi-36: #00af87;
        --term-ansi-37: #00afaf;
        --term-ansi-38: #00afd7;
        --term-ansi-39: #00afff;
        --term-ansi-40: #00d700;
        --term-ansi-41: #00d75f;
        --term-ansi-42: #00d787;
        --term-ansi-43: #00d7af;
        --term-ansi-44: #00d7d7;
        --term-ansi-45: #00d7ff;
        --term-ansi-46: #00ff00;
        --term-ansi-47: #00ff5f;
        --term-ansi-48: #00ff87;
        --term-ansi-49: #00ffaf;
        --term-ansi-50: #00ffd7;
        --term-ansi-51: #00ffff;
        --term-ansi-52: #5f0000;
        --term-ansi-53: #5f005f;
        --term-ansi-54: #5f0087;
        --term-ansi-55: #5f00af;
        --term-ansi-56: #5f00d7;
        --term-ansi-57: #5f00ff;
        --term-ansi-58: #5f5f00;
        --term-ansi-59: #5f5f5f;
        --term-ansi-60: #5f5f87;
        --term-ansi-61: #5f5faf;
        --term-ansi-62: #5f5fd7;
        --term-ansi-63: #5f5fff;
        --term-ansi-64: #5f8700;
        --term-ansi-65: #5f875f;
        --term-ansi-66: #5f8787;
        --term-ansi-67: #5f87af;
        --term-ansi-68: #5f87d7;
        --term-ansi-69: #5f87ff;
        --term-ansi-70: #5faf00;
        --term-ansi-71: #5faf5f;
        --term-ansi-72: #5faf87;
        --term-ansi-73: #5fafaf;
        --term-ansi-74: #5fafd7;
        --term-ansi-75: #5fafff;
        --term-ansi-76: #5fd700;
        --term-ansi-77: #5fd75f;
        --term-ansi-78: #5fd787;
        --term-ansi-79: #5fd7af;
        --term-ansi-80: #5fd7d7;
        --term-ansi-81: #5fd7ff;
        --term-ansi-82: #5fff00;
        --term-ansi-83: #5fff5f;
        --term-ansi-84: #5fff87;
        --term-ansi-85: #5fffaf;
        --term-ansi-86: #5fffd7;
        --term-ansi-87: #5fffff;
        --term-ansi-88: #870000;
        --term-ansi-89: #87005f;
        --term-ansi-90: #870087;
        --term-ansi-91: #8700af;
        --term-ansi-92: #8700d7;
        --term-ansi-93: #8700ff;
        --term-ansi-94: #875f00;
        --term-ansi-95: #875f5f;
        --term-ansi-96: #875f87;
        --term-ansi-97: #875faf;
        --term-ansi-98: #875fd7;
        --term-ansi-99: #875fff;
        --term-ansi-100: #878700;
        --term-ansi-101: #87875f;
        --term-ansi-102: #878787;
        --term-ansi-103: #8787af;
        --term-ansi-104: #8787d7;
        --term-ansi-105: #8787ff;
        --term-ansi-106: #87af00;
        --term-ansi-107: #87af5f;
        --term-ansi-108: #87af87;
        --term-ansi-109: #87afaf;
        --term-ansi-110: #87afd7;
        --term-ansi-111: #87afff;
        --term-ansi-112: #87d700;
        --term-ansi-113: #87d75f;
        --term-ansi-114: #87d787;
        --term-ansi-115: #87d7af;
        --term-ansi-116: #87d7d7;
        --term-ansi-117: #87d7ff;
        --term-ansi-118: #87ff00;
        --term-ansi-119: #87ff5f;
        --term-ansi-120: #87ff87;
        --term-ansi-121: #87ffaf;
        --term-ansi-122: #87ffd7;
        --term-ansi-123: #87ffff;
        --term-ansi-124: #af0000;
        --term-ansi-125: #af005f;
        --term-ansi-126: #af0087;
        --term-ansi-127: #af00af;
        --term-ansi-128: #af00d7;
        --term-ansi-129: #af00ff;
        --term-ansi-130: #af5f00;
        --term-ansi-131: #af5f5f;
        --term-ansi-132: #af5f87;
        --term-ansi-133: #af5faf;
        --term-ansi-134: #af5fd7;
        --term-ansi-135: #af5fff;
        --term-ansi-136: #af8700;
        --term-ansi-137: #af875f;
        --term-ansi-138: #af8787;
        --term-ansi-139: #af87af;
        --term-ansi-140: #af87d7;
        --term-ansi-141: #af87ff;
        --term-ansi-142: #afaf00;
        --term-ansi-143: #afaf5f;
        --term-ansi-144: #afaf87;
        --term-ansi-145: #afafaf;
        --term-ansi-146: #afafd7;
        --term-ansi-147: #afafff;
        --term-ansi-148: #afd700;
        --term-ansi-149: #afd75f;
        --term-ansi-150: #afd787;
        --term-ansi-151: #afd7af;
        --term-ansi-152: #afd7d7;
        --term-ansi-153: #afd7ff;
        --term-ansi-154: #afff00;
        --term-ansi-155: #afff5f;
        --term-ansi-156: #afff87;
        --term-ansi-157: #afffaf;
        --term-ansi-158: #afffd7;
        --term-ansi-159: #afffff;
        --term-ansi-160: #d70000;
        --term-ansi-161: #d7005f;
        --term-ansi-162: #d70087;
        --term-ansi-163: #d700af;
        --term-ansi-164: #d700d7;
        --term-ansi-165: #d700ff;
        --term-ansi-166: #d75f00;
        --term-ansi-167: #d75f5f;
        --term-ansi-168: #d75f87;
        --term-ansi-169: #d75faf;
        --term-ansi-170: #d75fd7;
        --term-ansi-171: #d75fff;
        --term-ansi-172: #d78700;
        --term-ansi-173: #d7875f;
        --term-ansi-174: #d78787;
        --term-ansi-175: #d787af;
        --term-ansi-176: #d787d7;
        --term-ansi-177: #d787ff;
        --term-ansi-178: #d7af00;
        --term-ansi-179: #d7af5f;
        --term-ansi-180: #d7af87;
        --term-ansi-181: #d7afaf;
        --term-ansi-182: #d7afd7;
        --term-ansi-183: #d7afff;
        --term-ansi-184: #d7d700;
        --term-ansi-185: #d7d75f;
        --term-ansi-186: #d7d787;
        --term-ansi-187: #d7d7af;
        --term-ansi-188: #d7d7d7;
        --term-ansi-189: #d7d7ff;
        --term-ansi-190: #d7ff00;
        --term-ansi-191: #d7ff5f;
        --term-ansi-192: #d7ff87;
        --term-ansi-193: #d7ffaf;
        --term-ansi-194: #d7ffd7;
        --term-ansi-195: #d7ffff;
        --term-ansi-196: #ff0000;
        --term-ansi-197: #ff005f;
        --term-ansi-198: #ff0087;
        --term-ansi-199: #ff00af;
        --term-ansi-200: #ff00d7;
        --term-ansi-201: #ff00ff;
        --term-ansi-202: #ff5f00;
        --term-ansi-203: #ff5f5f;
        --term-ansi-204: #ff5f87;
        --term-ansi-205: #ff5faf;
        --term-ansi-206: #ff5fd7;
        --term-ansi-207: #ff5fff;
        --term-ansi-208: #ff8700;
        --term-ansi-209: #ff875f;
        --term-ansi-210: #ff8787;
        --term-ansi-211: #ff87af;
        --term-ansi-212: #ff87d7;
        --term-ansi-213: #ff87ff;
        --term-ansi-214: #ffaf00;
        --term-ansi-215: #ffaf5f;
        --term-ansi-216: #ffaf87;
        --term-ansi-217: #ffafaf;
        --term-ansi-218: #ffafd7;
        --term-ansi-219: #ffafff;
        --term-ansi-220: #ffd700;
        --term-ansi-221: #ffd75f;
        --term-ansi-222: #ffd787;
        --term-ansi-223: #ffd7af;
        --term-ansi-224: #ffd7d7;
        --term-ansi-225: #ffd7ff;
        --term-ansi-226: #ffff00;
        --term-ansi-227: #ffff5f;
        --term-ansi-228: #ffff87;
        --term-ansi-229: #ffffaf;
        --term-ansi-230: #ffffd7;
        --term-ansi-231: #ffffff;
        --term-ansi-232: #080808;
        --term-ansi-233: #121212;
        --term-ansi-234: #1c1c1c;
        --term-ansi-235: #262626;
        --term-ansi-236: #303030;
        --term-ansi-237: #3a3a3a;
        --term-ansi-238: #444444;
        --term-ansi-239: #4e4e4e;
        --term-ansi-240: #585858;
        --term-ansi-241: #626262;
        --term-ansi-242: #6c6c6c;
        --term-ansi-243: #767676;
        --term-ansi-244: #808080;
        --term-ansi-245: #8a8a8a;
        --term-ansi-246: #949494;
        --term-ansi-247: #9e9e9e;
        --term-ansi-248: #a8a8a8;
        --term-ansi-249: #b2b2b2;
        --term-ansi-250: #bcbcbc;
        --term-ansi-251: #c6c6c6;
        --term-ansi-252: #d0d0d0;
        --term-ansi-253: #dadada;
        --term-ansi-254: #e4e4e4;
        --term-ansi-255: #eeeeee;
        --term-bg: var(--term-ansi-16);
        --term-fg: var(--term-ansi-231);
      }
      .theme-one-half-dark{--term-ansi-0:#282C34;--term-ansi-1:#E06C75;--term-ansi-2:#98C379;--term-ansi-3:#E5C07B;--term-ansi-4:#61AFEF;--term-ansi-5:#C678DD;--term-ansi-6:#56B6C2;--term-ansi-7:#DCDFE4;--term-ansi-8:#5A6374;--term-ansi-9:#E06C75;--term-ansi-10:#98C379;--term-ansi-11:#E5C07B;--term-ansi-12:#61AFEF;--term-ansi-13:#C678DD;--term-ansi-14:#56B6C2;--term-ansi-15:#DCDFE4;--term-fg:#DCDFE4;--term-bg:#282C34}
    </style>
  </head>
  <body>
    <div id="terminal" class="theme-default theme-one-half-dark">${h}</div>
  </body>
</html>`;
